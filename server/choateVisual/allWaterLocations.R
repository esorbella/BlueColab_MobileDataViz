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
  uiOutput("example"),

  # dropdowns for location & time
  selectInput("location", "Choose a Location:",
    choices = c("Choate Pond", "Yonkers (01376307)", "West Point (01374019)", "Poughkeepsie (01372043)"),
    selectize = FALSE
  ),
  selectInput("year", "Choose a Year:",
    choices = c("2021", "2022", "2023"),
    selected = "2023",
    selectize = FALSE
  ),
  selectInput("month", "Choose a Month:",
    choices = c(
      "January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October",
      "November", "December"
    ),
    selectize = FALSE
  ),
  selectInput("dataset", "Choose a dataset:",
    choices = c(
      "Conductivity", "Dissolved Oxygen",
      "Salinity", "Temperature", "Turbidity", "pH"
    ),
    selectize = FALSE
  )
)

# Define server logic
server <- function(input, output) {
  output$distPlot <- renderPlotly({
    # get user input
    location <- switch(input$location,
      "Yonkers (01376307)" = "01376307",
      "West Point (01374019)" = "01374019",
      "Poughkeepsie (01372043)" = "01372043",
      "Choate Pond" = "Choate"
    )
    start_year <- switch(input$year,
      "2023" = "2023",
      "2022" = "2022",
      "2021" = "2021"
    )
    start_month <- switch(input$month,
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
    end_year <- start_year
    end_month <- start_month
    end_day <- switch(input$month,
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

    data <- fetchData(location,input$dataset,start_year,start_month,start_day,end_year,end_month,end_day)
   
     wqi <- fromJSON(paste("http://choatevisual.us-east-1.elasticbeanstalk.com/WQI/Choate/",start_month,"-",start_year,sep = ""))

    output$example <- renderUI({
      HTML(paste0(
        "<div style='color:white;'>WQI: ", round(wqi$wqi), "</div><br/>",
        "<div style='color:white;'>Monthly summary</div><br/><div style='color:white;'>Min: ", min(data$value), "</div><br/>",
        "<div style='color:white;'>Max: ", max(data$value), "</div><br/>",
        "<div style='color:white;'>Average: ", mean(data$value), "</div><br/>"
      ))
    })

    # Compute daily max and min
    # print(data)
    data_maxmin <- data %>%
      group_by(timestamp) %>%
      summarise(
        daily_max = max(value),
        daily_min = min(value)
      )

    # Compute daily averages
    data_avg <- data %>%
      group_by(timestamp) %>%
      summarise(daily_avg = mean(value))


    # plot(rollmean(data, 5), type = "l", col = color)

    plot <- ggplot() +
      geom_ribbon(data = data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#336CED") +
      theme(plot.background = element_rect(fill = "#333333"), panel.background = element_rect(fill = "white"), panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "grey")) +
      geom_line(data = data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +
      # geom_point(data = subset(thresholds_data, low_flag), aes(x = timestamp, y = value), color = "red", size = 2, shape = 4) +
      # geom_point(data = subset(thresholds_data, high_flag), aes(x = timestamp, y = value), color = "blue", size = 2, shape = 2) +
      theme(panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "black")) +
      labs(title = "Daily Min / Max / Average", x = "Month-Day", y = "Measurement") +
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

fetchData <- function(location,dataset,start_year,start_month,start_day,end_year,end_month,end_day) {
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
    } else if (location == "Weather") {
      url <- paste("http://localhost:3000/Weather/Choate/10-2023")

      # Fetch data from the API
      my_data <- fromJSON(url)

      # Convert timestamp to Date format
      my_data$timestamp <- as.Date(my_data$timestamp, format = "%Y-%m-%d")

      # Create a data frame based on the selected dataset
      data <- data.frame(
        timestamp = my_data$timestamp,
        value = switch(dataset1,
          "Rain" = my_data$Rain,
          "Air Temperature" = my_data$AirTemp,
          "Relative Humidity" = my_data$RelHumid,
          "Wind Speed" = my_data$WindSpeed,
          "Barometric Pressure" = my_data$BaroPressure,
          "Vapor Pressure" = my_data$VaporPressure
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


# Run the application
shinyApp(ui = ui, server = server)