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
  titlePanel(h1("Monthly Weather Report",
    align = "center",
    style = "color: white;"
  )),

  # outputs
  plotlyOutput("distPlot") %>% withSpinner(color = "#FFFFFF"),
  uiOutput("example"),

  # dropdowns for location & time
  selectInput("location", "Choose a Location:",
    choices = c( "Choate Weather"),
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
  selectInput("dataset", "Choose a dataset for the weather:",
    choices = c(
      "Rain", "Air Temperature", "Relative Humidity",
      "Wind Speed", "Barometric Pressure", "Vapor Pressure"
    ),
    selectize = FALSE
  )
)

# Define server logic
server <- function(input, output) {
  output$distPlot <- renderPlotly({
    # get user input
    location <- switch(input$location,
      "Choate Weather" = "Weather"
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

    month_year <- paste(input$month, input$year)

    output$example <- renderUI({
      HTML(paste0(
        
        "div style='color:white; font-weight: bold; font-size: larger;'>Monthly Summary For ", input$month, " ", input$year, " of ", input$dataset, ":</div><br/>",
        "<div style='color:white;'>Min: ", min(data$value), "</div><br/>",
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
    scale_x_continuous(expand = c(0,0)) +
    scale_y_continuous(expand = c(0,0)) +

      # geom_point(data = subset(thresholds_data, low_flag), aes(x = timestamp, y = value), color = "red", size = 2, shape = 4) +
      # geom_point(data = subset(thresholds_data, high_flag), aes(x = timestamp, y = value), color = "blue", size = 2, shape = 2) +
      theme(panel.grid.major.x = element_blank(), panel.grid.major.y = element_line(size = .1, color = "black")) +
      labs(title = "Daily Min / Max / Average", x = paste(c(month_year)), y = input$dataset) +
      theme(
        text = element_text(family = "Nunito", color = "White"),
        axis.text.x = element_text(size = 10, color = "white"),
        axis.text.y = element_text(size = 10, color = "white")
      ) 


 
    interactive_plot <- ggplotly(plot) %>%
      layout(hovermode = "x unified")

    interactive_plot
  })
}

fetchData <- function(location,dataset,start_year,start_month,start_day,end_year,end_month,end_day) {
  # logic to get appropriate data

      url <- paste("http://choatevisual.us-east-1.elasticbeanstalk.com/Weather/Choate/",start_month,"-",start_year,sep = "")

      # Fetch data from the API
      my_data <- fromJSON(url)

      # Convert timestamp to Date format
      my_data$timestamp <- as.Date(my_data$timestamp, format = "%Y-%m-%d")

      # Create a data frame based on the selected dataset
      data <- data.frame(
        timestamp = my_data$timestamp,
        value = switch(dataset,
          "Rain" = my_data$Rain,
          "Air Temperature" = my_data$AirTemp,
          "Relative Humidity" = my_data$RelHumid,
          "Wind Speed" = my_data$WindSpeed,
          "Barometric Pressure" = my_data$BaroPressure,
          "Vapor Pressure" = my_data$VaporPressure
        )
      )
    
    
  if (dataset == "Air Temperature") {
    data <- data %>% mutate(value = map_dbl(value, ~ (. * (9 / 5) + 32) %>% unlist()))
    }
  return(data)
}


# Run the application
shinyApp(ui = ui, server = server)