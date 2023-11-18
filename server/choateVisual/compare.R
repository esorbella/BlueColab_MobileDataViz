# Libraries
library(shiny)
library(jsonlite)
library(zoo)
library(ggplot2)
library(shinyWidgets)
library(dataRetrieval)
library(dplyr)
library(lubridate)
library(plotly)
library(ggthemes)
library(shinycssloaders)

# Define UI
ui <- fluidPage(
  setBackgroundColor("#333333"),

  # title
  titlePanel(h1("Monthly Water Report",
    align = "center",
    style = "color: white;"
  )),

  # outputs
  plotlyOutput("distPlot") %>% withSpinner(color = "#FFFFFF"),
  fluidRow(
    column(3, uiOutput("first")),
    column(3, uiOutput("second"))
  ),
  # dropdowns for location & time
  fluidRow(
    column(
      6, # Half of the row
      selectInput("location", "Choose a Location:",
        choices = c("Choate Pond", "Yonkers (01376307)", "West Point (01374019)", "Poughkeepsie (01372043)"),
        selectize = FALSE
      ),
      selectInput("firstYear", "Choose a Start Year:",
        choices = c("2023", "2021", "2022"),
        selectize = FALSE
      ),
      selectInput("firstMonth", "Choose a Start Month:",
        choices = c(
          "January", "February", "March", "April", "May",
          "June", "July", "August", "September", "October",
          "November", "December"
        ),
        selectize = FALSE
      )
    ),
    column(
      6, # Half of the row
      selectInput("dataset", "Choose a dataset:",
        choices = c(
          "Conductivity", "Dissolved Oxygen",
          "Salinity", "Temperature", "Turbidity", "pH"
        ),
        selectize = FALSE
      ),
      selectInput("secondYear", "Choose an End Year:",
        choices = c("2023", "2021", "2022"),
        selectize = FALSE
      ),
      selectInput("secondMonth", "Choose an End Month:",
        choices = c(
          "January", "February", "March", "April", "May",
          "June", "July", "August", "September", "October",
          "November", "December"
        ),
        selectize = FALSE
      )
    )
  ),
)

# Define server logic
server <- function(input, output) {
  output$distPlot <- renderPlotly({
    location <- switch(input$location,
      "Yonkers (01376307)" = "01376307",
      "West Point (01374019)" = "01374019",
      "Poughkeepsie (01372043)" = "01372043",
      "Choate Pond" = "Choate"
    )
    first_start_year <- switch(input$firstYear,
      "2023" = "2023",
      "2022" = "2022",
      "2021" = "2021"
    )
    first_start_month <- switch(input$firstMonth,
      "January" = "01",
      "February" = "02",
      "March" = "03",
      "April" = "04",
      "May" = "05",
      "June" = "06",
      "July" = "07",
      "August" = "08",
      "September" = "09",
      "October" = "10",
      "November" = "11",
      "December" = "12"
    )
    start_day <- "01"
    first_end_year <- first_start_year
    first_end_month <- first_start_month
    first_end_day <- switch(input$firstMonth,
      "January" = "31",
      "February" = "28",
      "March" = "31",
      "April" = "30",
      "May" = "31",
      "June" = "30",
      "July" = "31",
      "August" = "31",
      "September" = "30",
      "October" = "31",
      "November" = "30",
      "December" = "31"
    )

    second_start_year <- switch(input$secondYear,
      "2023" = "2023",
      "2022" = "2022",
      "2021" = "2021"
    )
    second_start_month <- switch(input$secondMonth,
      "January" = "01",
      "February" = "02",
      "March" = "03",
      "April" = "04",
      "May" = "05",
      "June" = "06",
      "July" = "07",
      "August" = "08",
      "September" = "09",
      "October" = "10",
      "November" = "11",
      "December" = "12"
    )
    second_end_year <- second_start_year
    second_end_month <- second_start_month
    second_end_day <- switch(input$secondMonth,
      "January" = "31",
      "February" = "28",
      "March" = "31",
      "April" = "30",
      "May" = "31",
      "June" = "30",
      "July" = "31",
      "August" = "31",
      "September" = "30",
      "October" = "31",
      "November" = "30",
      "December" = "31"
    )

    # gets data
    data <- fetchData(location, input$dataset, first_start_year, first_start_month, start_day, first_end_year, first_end_month, first_end_day)
    second_data <- fetchData(location, input$dataset, second_start_year, second_start_month, start_day, second_end_year, second_end_month, second_end_day)

    # get wqis
    wqi <- fromJSON(paste("http://choatevisual.us-east-1.elasticbeanstalk.com/WQI/Choate/", first_start_month, "-", first_start_year, sep = ""))
    second_wqi <- fromJSON(paste("http://choatevisual.us-east-1.elasticbeanstalk.com/WQI/Choate/", second_start_month, "-", second_start_year, sep = ""))

    # display reports
    output$first <- generateUI(input$firstMonth, input$firstYear, wqi, data)
    output$second <- generateUI(input$secondMonth, input$secondYear, second_wqi, second_data)

    # find max and mins
    data_maxmin <- findMaxMin(data)
    second_data_maxmin <- findMaxMin(second_data)

    # cleans up timestamp mismatch
    if (nrow(data_maxmin) > nrow(second_data_maxmin)) {
      data_maxmin <- head(data_maxmin, nrow(second_data_maxmin) - nrow(data_maxmin))
      data_maxmin$timestamp <- as.Date(second_data_maxmin$timestamp, format = "%Y-%m-%d")
    } else if (nrow(second_data_maxmin) > nrow(data_maxmin)) {
      second_data_maxmin <- head(second_data_maxmin, nrow(data_maxmin) - nrow(second_data_maxmin))
      second_data_maxmin$timestamp <- as.Date(data_maxmin$timestamp, format = "%Y-%m-%d")
    } else {
      data_maxmin$timestamp <- as.Date(second_data_maxmin$timestamp, format = "%Y-%m-%d")
    }

    # Compute daily averages
    data_avg <- findDailyAvg(data)
    second_data_avg <- findDailyAvg(second_data)

    # cleans up data mismatch
    if (nrow(data_avg) > nrow(second_data_avg)) {
      data_avg <- head(data_avg, nrow(second_data_avg) - nrow(data_avg))
      data_avg$timestamp <- as.Date(second_data_avg$timestamp, format = "%Y-%m-%d")
    } else if (nrow(second_data_avg) > nrow(data_avg)) {
      second_data_avg <- head(second_data_avg, nrow(data_avg) - nrow(second_data_avg))
      second_data_avg$timestamp <- as.Date(data_avg$timestamp, format = "%Y-%m-%d")
    } else {
      data_avg$timestamp <- as.Date(second_data_avg$timestamp, format = "%Y-%m-%d")
    }

    # plots
    plot <- ggplot() +
      theme(plot.background = element_rect(fill = "#333333"), panel.background = element_rect(fill = "white"), panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "grey")) +

      # draws the first line
      geom_ribbon(data = data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#336bed95") +
      geom_line(data = data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +

      # draws the second line
      geom_ribbon(data = second_data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#ff000075") +
      geom_line(data = second_data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +
      theme(panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "black")) +
      labs(
        title = "Daily Min / Max / Average", x = "Month-Day",
        y = "Measurement"
      ) +
      theme(
        text = element_text(family = "Nunito", color = "White"),
        axis.text.x = element_text(size = 10, color = "white"),
        axis.text.y = element_text(size = 10, color = "white")
      )

    #    ggplotly(plot)

    interactive_plot <- ggplotly(plot) %>%
      layout(hovermode = "x unified")

    interactive_plot
  })
}

# Run the application
shinyApp(ui = ui, server = server)

fetchData <- function(location, dataset, start_year, start_month, start_day, end_year, end_month, end_day) {
  # logic to get appropriate data
  if (location == "Choate") { # if Choate data is selected
    # gets Data from Blue CoLab
    my_data <- fromJSON(paste("https://colabprod01.pace.edu/api/influx/",
      "sensordata/Alan/idk/range?stream=false",
      "&start_date=", start_year, "-", start_month,
      "-", start_day, "T00%3A00%3A00%2B00%3A00",
      "&stop_date=", end_year, "-", end_month,
      "-", end_day, "T23%3A59%3A59%2B00%3A00",
      sep = ""
    )) # R doesn't have string concatenation

    my_data$timestamp <- as.Date(my_data$timestamp)

    # gets specific parameter
    data <- data.frame(
      timestamp = my_data$timestamp,
      value = switch(dataset,
        "Conductivity" = my_data$sensors$Cond,
        "Dissolved Oxygen" = my_data$sensors$DOpct,
        "Salinity" = my_data$sensors$Sal,
        "Temperature" = my_data$sensors$Temp,
        "Turbidity" = my_data$sensors$Turb,
        "pH" = my_data$sensors$pH
      )
    )
  } else {
    # otherwise use USGS API
    my_data <- readNWISuv(siteNumbers = location, parameterCd = "all", startDate = paste(start_year, "-", start_month, "-", start_day, sep = ""), endDate = paste(end_year, "-", end_month, "-", end_day, sep = ""))
    my_data$timestamp <- as.Date(my_data$dateTime)
  }

  if (location == "01376307") { # Yonkers
    # gets specific parameter
    data <- data.frame(
      timestamp = my_data$timestamp,
      value = switch(dataset,
        "Conductivity" = my_data$X_00095_00000,
        "Dissolved Oxygen" = my_data$X_00300_00000,
        "Salinity" = my_data$X_90860_00000,
        "Temperature" = my_data$X_00010_00000,
        "Turbidity" = my_data$X_63680_00000,
        "pH" = my_data$X_00400_00000
      )
    )
  } else if (location == "01374019") { # West Point
    data <- data.frame(
      timestamp = my_data$timestamp,
      value = switch(dataset,
        "Conductivity" = my_data$X_.HRECOS._00095_00000,
        "Dissolved Oxygen" = my_data$X_.HRECOS._00300_00000,
        "Salinity" = my_data$X_.HRECOS._90860_00000,
        "Temperature" = my_data$X_.HRECOS._00010_00000,
        "Turbidity" = my_data$X_.HRECOS._63680_00000,
        "pH" = my_data$X_.HRECOS._00400_00000
      )
    )
  } else if (location == "01372043") { # Pough.
    data <- data.frame(
      timestamp = my_data$timestamp,
      value = switch(dataset,
        "Conductivity" = my_data$X_Surface_00095_00000,
        "Dissolved Oxygen" = my_data$X_Surface_00300_00000,
        "Salinity" = my_data$X_Surface_90860_00000,
        "Temperature" = my_data$X_Surface_00010_00000,
        "Turbidity" = my_data$X_Surface_63680_00000,
        "pH" = my_data$X_Surface_00400_00000
      )
    )
  }
  return(data)
}

generateUI <- function(month, year, wqi, data) {
  return(renderUI({
    HTML(paste0(
      "<div style='color:white;'>Monthly Summary For ", month, " ", year, ":</div><br/>",
      "<div style='color:white;'>WQI: ", round(wqi$wqi), "</div><br/>",
      "<div style='color:white;'>Min: ", min(data$value), "</div><br/>",
      "<div style='color:white;'>Max: ", max(data$value), "</div><br/>",
      "<div style='color:white;'>Average: ", round(mean(data$value)), "</div>"
      # "<div style='background-color: #336bed95; color:white; width: 80px;' >blue",input$firstMonth, " ", input$firstYear,"</div>",
      # "<div style='background-color: #ff000075; color:white; width: 80px;' >red",input$secondMonth, " ", input$secondYear,"</div>"
    ))
  }))
}

findMaxMin <- function(data) {
  data_maxmin <- data %>%
    group_by(timestamp) %>%
    summarise(
      daily_max = max(value),
      daily_min = min(value)
    )

  return(data_maxmin)
}

findDailyAvg <- function(data) {
  data_avg <- data %>%
    group_by(timestamp) %>%
    summarise(daily_avg = mean(value))
  return(data_avg)
}