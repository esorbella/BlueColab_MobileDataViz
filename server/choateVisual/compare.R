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
library(purrr)

# Define UI
ui <- fluidPage(
  # background color
  setBackgroundColor("#333333"),

  # title
  titlePanel(h1("Monthly Water Report",
    align = "center",
    style = "color: white;"
  )),

  # data outputs
  plotlyOutput("distPlot") %>% withSpinner(color = "#FFFFFF"),
  fluidRow(
    column(6, uiOutput("first"), plotlyOutput("firstGauge", height = "175px")),
    column(6, uiOutput("second"), plotlyOutput("secondGauge", height = "175px"))
  ),
  selectInput("dataset", "Choose a dataset:",
    choices = c(
      "Conductivity", "Dissolved Oxygen",
      "Salinity", "Temperature", "Turbidity", "pH"
    ),
    selectize = FALSE
  ),

  # dropdowns for location & time
  fluidRow(
    column(
      6, # Half of the row
      selectInput("location", "Choose a Location:",
        choices = c("NA", "Choate Pond", "Yonkers (01376307)", "West Point (01374019)", "Poughkeepsie (01372043)"),
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
      selectInput("secondLocation", "Choose a Location:",
        choices = c("NA", "Choate Pond", "Yonkers (01376307)", "West Point (01374019)", "Poughkeepsie (01372043)"),
        selectize = FALSE
      ),
      selectInput("secondYear", "Choose an End Year:",
        choices = c("NA", "2023", "2021", "2022"),
        selectize = FALSE
      ),
      selectInput("secondMonth", "Choose an End Month:",
        choices = c(
          "NA", "January", "February", "March", "April", "May",
          "June", "July", "August", "September", "October",
          "November", "December"
        ),
        selectize = FALSE
      )
    )
  )
)

# Define server logic
server <- function(input, output, session) {
  # renders plot
  output$distPlot <- renderPlotly({
    # various switches responsible for getting parameters from the user
    # getting location
    location <- switch(input$location,
      "Yonkers (01376307)" = "01376307",
      "West Point (01374019)" = "01374019",
      "Poughkeepsie (01372043)" = "01372043",
      "Choate Pond" = "Choate",
      "NA" = "NA" # location by default has to be NA because we take in parameters through URL
    )             # otherwise, the default location code would run, then the one in the parameter

    # gets location provided in URL, if provided
    query <- parseQueryString(session$clientData$url_search) # gets url parameters
    print(query[["month"]])
    print(query[["year"]])


    if (!is.null(query[["defaultLocation"]]) && location=="NA") {
      location_URL <- query[["defaultLocation"]] # gets location parameter

      if (location_URL == "Choate") {
        updateSelectInput(session, "location", selected = "Choate Pond")
      } else if (location_URL == "WP") {
        updateSelectInput(session, "location", selected = "West Point (01374019)")
      } else if (location_URL == "P") {
        updateSelectInput(session, "location", selected = "Poughkeepsie (01372043)")
      } else if (location_URL == "Y") {
        updateSelectInput(session, "location", selected = "Yonkers (01376307)")
      } else {
        updateSelectInput(session, "location", selected = "Choate Pond")
      }
    } else if (location == "NA") {
      updateSelectInput(session, "location", selected = "Choate Pond") # if no parameter are provided
    }

    # getting drop downs for first month
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

    # getting drop downs for second month
    second_start_year <- switch(input$secondYear,
      "2023" = "2023",
      "2022" = "2022",
      "2021" = "2021",
      "NA" = "NA"
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
      "December" = "12",
      "NA" = "NA"
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
      "December" = "31",
      "NA" = "NA"
    )

    second_location <- switch(input$secondLocation,
      "Yonkers (01376307)" = "01376307",
      "West Point (01374019)" = "01374019",
      "Poughkeepsie (01372043)" = "01372043",
      "Choate Pond" = "Choate",
      "NA" = "NA"
    )

    thresholds <- list(
      "Conductivity" = c(150, 500),
      "pH" = c(7, 8),
      "Dissolved Oxygen" = c(80, 120),
      "Salinity" = c(0, 1),
      "Temperature" = c(32, 75.2), # 0,24
      "Turbidity" = c(0, 24)
    )


    if (location != "NA") { # if to check to make sure a location is selected
      
      
      # this section gets data for the first month
      # gets data
      data <- fetch_data(location, input$dataset, first_start_year, first_start_month, start_day, first_end_year, first_end_month, first_end_day)

      # get wqis
      if (location == "Choate") {
        wqi <- fromJSON(paste("http://choatevisual.us-east-1.elasticbeanstalk.com/WQI/Choate/", first_start_month, "-", first_start_year, sep = ""))
      } else {
        wqi <- "NA"
      }
      # display reports
      output$first <- generate_ui(input$firstMonth, input$firstYear, data, input$dataset)
      output$firstGauge <- renderPlotly({
        gauge_chart(wqi, location)
      })

      # find max and mins
      data_maxmin <- find_max_min(data)

      # Compute daily averages
      data_avg <- find_daily_avg(data)



      if ((second_end_day == "NA" || second_start_month == "NA" || second_start_year == "NA" || second_location == "NA") && location != "NA") {
        # this section runs only where one month is selected
        # gets the graph
        interactive_plot <- single_plot(data, data_maxmin, data_avg, input$dataset, thresholds)

        # displays graph
        interactive_plot
      } else if (second_end_day != "NA" && second_start_month != "NA" && second_start_year != "NA" && second_location != "NA" && location != "NA") {
        # this runs only when there's two months selected
        # this section gets data for the second month

        # get data
        second_data <- fetch_data(second_location, input$dataset, second_start_year, second_start_month, start_day, second_end_year, second_end_month, second_end_day)

        # get wqis
        if (second_location == "Choate") {
          second_wqi <- fromJSON(paste("http://choatevisual.us-east-1.elasticbeanstalk.com/WQI/Choate/", second_start_month, "-", second_start_year, sep = ""))
        } else {
          second_wqi <- "NA"
        }

        # display reports
        output$second <- generate_ui(input$secondMonth, input$secondYear, second_data, input$dataset)
        output$secondGauge <- renderPlotly({
          gauge_chart(second_wqi, second_location)
        })

        # find max mins
        second_data_maxmin <- find_max_min(second_data)

        # Compute daily averages
        second_data_avg <- find_daily_avg(second_data)

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

        # gets the graph
        interactive_plot <- double_plot(data, data_maxmin, data_avg, second_data_maxmin, second_data_avg, input$dataset, thresholds)

        # displays graph
        interactive_plot
      }
    }
  })
}

# logic to get data
fetch_data <- function(location, dataset, start_year, start_month, start_day, end_year, end_month, end_day) {
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
      ),
      temp = my_data$sensors$Temp
    )
  } else {
    # otherwise use USGS API
    my_data <- readNWISuv(siteNumbers = location, parameterCd = "all", startDate = paste(start_year, "-", start_month, "-", start_day, sep = ""), endDate = paste(end_year, "-", end_month, "-", end_day, sep = ""))
    my_data$timestamp <- as.Date(my_data$dateTime)

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
        ),
        temp = my_data$X_00010_00000
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
        ),
        temp = my_data$X_.HRECOS._00010_00000
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
        ), # Close Switch
        temp = my_data$X_Surface_00010_00000
      ) # close DataFrame
    } # close Pough
  } # close else



  data <- convert_units(data, dataset, location)
  data <- remove_outliers(data)


  return(data)
} # close function

convert_units <- function(data, dataset, location) {
  if (dataset == "Temperature") {
    data <- data %>% mutate(value = map_dbl(value, ~ (. * (9 / 5) + 32) %>% unlist()))
  }

  if (dataset == "Conductivity" && location != "Choate") {
    data <- data %>% mutate(value = map_dbl(value, ~ (. / 1000) %>% unlist()))
  } # todo: check if it's valid conversion

  if (dataset == "Salinity" && location != "Choate") {
    data <- data %>% mutate(value = map_dbl(value, ~ (. * 1000) %>% unlist()))
  } # todo: check if it's valid conversion

  if (dataset == "Dissolved Oxygen" && location != "Choate") {
    data <- data %>%
      mutate(value = pmap_dbl(list(value, temp), function(x, y) x / max_do(y) * 100))
  }

  return(data)
}

# Function to find the max do mg/L of a water based on temperature
# Source: https://www.waterontheweb.org/under/waterquality/dosatcalc.html
max_do <- function(temperature) {
  # Input variables
  tc <- temperature # Water temperature in degrees Celsius
  tk <- tc + 273.15 # Water temperature in Kelvin
  pAtm <- 1
  pWV <- exp(11.8571 - (3840.7 / tk) - (216961 / tk^2)) # Partial pressure of water vapor in atmospheres using the Antoine equation
  theta <- 9.75E-4 - (1.426E-5 * tc) + (6.436E-8 * tc^2) # Coefficient related to oxygen solubility
  cStar <- exp(7.7117 - 1.31403 * log(tc + 45.93)) # Equilibrium oxygen concentration at standard pressure (1 atm)
  pctSat <- 100

  # Calculate dissolved oxygen concentration (cP)
  cP <- cStar * pAtm * (((1 - pWV / pAtm) * (1 - theta * pAtm)) / ((1 - pWV) * (1 - theta)))

  o2 <- pctSat / 100 * cP
  return(round(o2, 2)) # Update dissolved oxygen field
}

# removing outliers by doing rolling average
remove_outliers <- function(data) {
  # Define the window size for the rolling mean
  window_size <- 4 # Adjust the window size as needed

  # Apply the rolling mean in place
  data$value <- rollapply(data$value, width = window_size, FUN = mean, align = "right", fill = NA)

  # Remove rows with NA values
  data <- data[complete.cases(data), ]
  return(data)
}

# logic to display mins and maxes
generate_ui <- function(month, year, data, dataset) {
  return(renderUI({
    HTML(paste0(
      "<div style='color:white; font-weight: bold; font-size: larger;'>Monthly Summary For ", month, " ", year, " of ",dataset,":</div><br/>",
      "<div style='color:white;'>Min: ", min(data$value), "</div><br/>",
      "<div style='color:white;'>Max: ", max(data$value), "</div><br/>",
      "<div style='color:white;'>Average: ", round(mean(data$value)), "</div>"
    ))
  }))
}

# logic to find the "bounds"
find_max_min <- function(data) {
  data_maxmin <- data %>%
    group_by(timestamp) %>%
    summarise(
      daily_max = max(value),
      daily_min = min(value)
    )

  return(data_maxmin)
}

# logic to find the average
find_daily_avg <- function(data) {
  data_avg <- data %>%
    group_by(timestamp) %>%
    summarise(daily_avg = mean(value))
  return(data_avg)
}

# responsible for drawing the single month
single_plot <- function(data, data_maxmin, data_avg, dataset, thresholds) {
  # gets markers for average/min/max lines
  avg_thresholds_data <- draw_thresholds_data_avg(data_avg, dataset, thresholds)
  min_thresholds_data <- draw_thresholds_data_min(data_maxmin, dataset, thresholds)
  max_thresholds_data <- draw_thresholds_data_max(data_maxmin, dataset, thresholds)

  # plots
  plot <- ggplot() +
    theme(plot.background = element_rect(fill = "#333333"), panel.background = element_rect(fill = "white"), panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "grey")) +

    # draws the first line
    geom_ribbon(data = data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#336bed95") +
    geom_line(data = data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +

    # draws the three thresholds
    geom_point(data = subset(avg_thresholds_data, low_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(avg_thresholds_data, high_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(avg_thresholds_data, norm_flag), aes(x = timestamp, y = daily_avg), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(min_thresholds_data, low_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(min_thresholds_data, high_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(min_thresholds_data, norm_flag), aes(x = timestamp, y = daily_min), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(max_thresholds_data, low_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(max_thresholds_data, high_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(max_thresholds_data, norm_flag), aes(x = timestamp, y = daily_max), color = "black", size = 2, shape = 3) +
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

  interactive_plot <- ggplotly(plot) %>%
    layout(hovermode = "x unified")

  return(interactive_plot)
}

# please update this function to however you feel is appropriate!
double_plot <- function(data, data_maxmin, data_avg, second_data_maxmin, second_data_avg, dataset, thresholds) {
  # gets markers for average/max/min lines
  avg_thresholds_data <- draw_thresholds_data_avg(data_avg, dataset, thresholds)
  min_thresholds_data <- draw_thresholds_data_min(data_maxmin, dataset, thresholds)
  max_thresholds_data <- draw_thresholds_data_max(data_maxmin, dataset, thresholds)

  # gets markers for average/max/min lines, for the other line
  second_avg_thresholds_data <- draw_thresholds_data_avg(second_data_avg, dataset, thresholds)
  second_min_thresholds_data <- draw_thresholds_data_min(second_data_maxmin, dataset, thresholds)
  second_max_thresholds_data <- draw_thresholds_data_max(second_data_maxmin, dataset, thresholds)

  plot <- ggplot() +
    theme(plot.background = element_rect(fill = "#333333"), panel.background = element_rect(fill = "white"), panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "grey")) +

    # draws the first line
    geom_ribbon(data = data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#336bed95") +
    geom_line(data = data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +

    # draws the second line
    geom_ribbon(data = second_data_maxmin, aes(x = timestamp, ymin = daily_min, ymax = daily_max), fill = "#ff000075") +
    geom_line(data = second_data_avg, aes(x = timestamp, y = daily_avg), color = "black", size = 1) +

    # themes
    theme(panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "black")) +

    # draws the three thresholds
    geom_point(data = subset(avg_thresholds_data, low_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(avg_thresholds_data, high_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(avg_thresholds_data, norm_flag), aes(x = timestamp, y = daily_avg), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(min_thresholds_data, low_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(min_thresholds_data, high_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(min_thresholds_data, norm_flag), aes(x = timestamp, y = daily_min), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(max_thresholds_data, low_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(max_thresholds_data, high_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(max_thresholds_data, norm_flag), aes(x = timestamp, y = daily_max), color = "black", size = 2, shape = 3) +

    # draws the three thresholds for second month
    geom_point(data = subset(second_avg_thresholds_data, low_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(second_avg_thresholds_data, high_flag), aes(x = timestamp, y = daily_avg), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(second_avg_thresholds_data, norm_flag), aes(x = timestamp, y = daily_avg), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(second_min_thresholds_data, low_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(second_min_thresholds_data, high_flag), aes(x = timestamp, y = daily_min), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(second_min_thresholds_data, norm_flag), aes(x = timestamp, y = daily_min), color = "black", size = 2, shape = 3) +
    geom_point(data = subset(second_max_thresholds_data, low_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 6) +
    geom_point(data = subset(second_max_thresholds_data, high_flag), aes(x = timestamp, y = daily_max), color = "red", size = 2, shape = 2) +
    # geom_point(data = subset(second_max_thresholds_data, norm_flag), aes(x = timestamp, y = daily_max), color = "black", size = 2, shape = 3) +

    labs(
      title = "Daily Min / Max / Average", x = "Month-Day",
      y = "Measurement"
    ) +
    theme(
      text = element_text(family = "Nunito", color = "White"),
      axis.text.x = element_text(size = 10, color = "white"),
      axis.text.y = element_text(size = 10, color = "white")
    )

  interactive_plot <- ggplotly(plot) %>%
    layout(hovermode = "x unified")

  return(interactive_plot)
}

# draws gauge
gauge_chart <- function(wqi, location) {
  if (location != "Choate") {
    gauge_chart <- plot_ly(
      value = "NA",
      type = "indicator",
      mode = "gauge+number",
      height = 200,
      gauge = list(
        axis = list(
          range = list(0, 100),
          tickvals = c(0, 25, 50, 70, 90, 100),
          ticktext = c("0", "25", "50", "70", "90", "100")
        ),
          steps = list(
          list(range = c(0, 25), color = "darkred"),
          list(range = c(25, 50), color = "darkorange"),
          list(range = c(50, 70), color = "yellow"),
          list(range = c(70, 90), color = "#4ff04ce8"),
          list(range = c(90, 100), color = "#2a6423")
        ),
        bgcolor = "#333333",
        bar = list(color = "#000000"),
        threshold = list(
          line = list(color = "#000000", width = 4),
          thickness = 0.75,
          value = 0 # Set the threshold value to 0 for "NA" case
        )
      )
    )

    gauge_chart <- gauge_chart %>%
      layout(
        paper_bgcolor = "#333333",
        font = list(color = "white")
      )
    return(gauge_chart)
  }
  value <- wqi$wqi

  # Define custom tick values and labels
  custom_ticks <- c(0, 25, 50, 70, 90, 100)
  custom_tick_labels <- c("0", "25", "50", "70", "90", "100")

  # Create a gauge chart using plot_ly with custom tick values and labels
  gauge_chart <- plot_ly(
    value = value,
    type = "indicator",
    mode = "gauge+number",
    height = 200,
    gauge = list(
      axis = list(
        range = list(0, 100),
        tickvals = custom_ticks,
        ticktext = custom_tick_labels
      ),
      steps = list(
        list(range = c(0, 25), color = "darkred"),
        list(range = c(25, 50), color = "darkorange"),
        list(range = c(50, 70), color = "yellow"),
        list(range = c(70, 90), color = "#4ff04ce8"),
        list(range = c(90, 100), color = "#2a6423")
      ),
      bgcolor = "#333333",
      bar = list(color = "#ffffffe7"),
      threshold = list(
        line = list(color = "ffffffe7", width = 4),
        thickness = 0.75,
        value = wqi$wqi
      )
    )
  )


  gauge_chart <- gauge_chart %>%
    layout(
      paper_bgcolor = "#333333",
      font = list(color = "white")
    )


  return(gauge_chart)
}

# gets if parameter needs to be flagged or not
draw_thresholds_data_avg <- function(data_avg, dataset, thresholds) {
  return(data_avg %>%
    mutate(
      low_flag = ifelse(daily_avg < thresholds[[dataset]][1], TRUE, FALSE),
      high_flag = ifelse(daily_avg > thresholds[[dataset]][2], TRUE, FALSE),
      norm_flag = ifelse((daily_avg > thresholds[[dataset]][1]) & (daily_avg < thresholds[[dataset]][2]), TRUE, FALSE)
    ))
}

# gets if parameter needs to be flagged or not
draw_thresholds_data_min <- function(data_maxmin, dataset, thresholds) {
  return(data_maxmin %>%
    mutate(
      low_flag = ifelse(daily_min < thresholds[[dataset]][1], TRUE, FALSE),
      high_flag = ifelse(daily_min > thresholds[[dataset]][2], TRUE, FALSE),
      norm_flag = ifelse((daily_min > thresholds[[dataset]][1]) & (daily_min < thresholds[[dataset]][2]), TRUE, FALSE)
    ))
}

# gets if parameter needs to be flagged or not
draw_thresholds_data_max <- function(data_maxmin, dataset, thresholds) {
  return(data_maxmin %>%
    mutate(
      low_flag = ifelse(daily_max < thresholds[[dataset]][1], TRUE, FALSE),
      high_flag = ifelse(daily_max > thresholds[[dataset]][2], TRUE, FALSE),
      norm_flag = ifelse((daily_max > thresholds[[dataset]][1]) & (daily_max < thresholds[[dataset]][2]), TRUE, FALSE)
    ))
}

# Run the application
shinyApp(ui = ui, server = server)