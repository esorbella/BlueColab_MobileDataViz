# Libraries
library(shiny)
library(jsonlite)
library(zoo)
library(ggplot2)
library(shinyWidgets)
library(dataRetrieval)
library(dplyr)
library(lubridate)

# Define UI
ui <- fluidPage(
  setBackgroundColor("#333333"),

  # title
  titlePanel(h1("Weather Report",
    align = "center",
    style = "color: white;"
  )),

  # outputs
  plotOutput("distPlot"),
  uiOutput("example"),
  selectInput("year", "Choose a Year:",
    choices = c("2023", "2021", "2022"),
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
  output$distPlot <- renderPlot({
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
    start_day <- "27"
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

    y_value_axis <- switch(input$dataset,
      "Conductivity" = "Conductivity",
      "Dissolved Oxygen" = "Dissolved Oxygen",
      "Salinity" = "Salinity",
      "Temperature" = "Temperature",
      "Turbidity" = "Turbidity",
      "pH" = "pH"
    )


    my_data <- fromJSON("https://colabprod01.pace.edu/api/influx/sensordata/Alan/idk/range?stream=false&start_date=2023-09-27T00%3A00%3A00%2B00%3A00&stop_date=2023-09-30T23%3A59%3A59%2B00%3A00") # R doesn't have string concatenation

    my_data1 <- fromJSON("server/choateVisual/data.json")



    my_data$timestamp <- as.Date(my_data$timestamp)

    # gets specific parameter
    data <- data.frame(
      timestamp = my_data$timestamp,
      value = switch(input$dataset,
        "Conductivity" = my_data$sensors$Cond,
        "Dissolved Oxygen" = my_data$sensors$DOpct,
        "Salinity" = my_data$sensors$Sal,
        "Temperature" = my_data$sensors$Temp,
        "Turbidity" = my_data$sensors$Turb,
        "pH" = my_data$sensors$pH
      )
    )

    # sets color
    color <- switch(input$dataset,
      "Conductivity" = "red",
      "Dissolved Oxygen" = "blue",
      "Salinity" = "orange",
      "Temperature" = "green",
      "Turbidity" = "purple",
      "pH" = "brown"
    )

    output$example <- renderUI({
      HTML(paste0(
        "<div style='color:white;'>Montly summary</div><br/><div style='color:white;'>Min: ", min(data$value), "</div><br/>",
        "<div style='color:white;'>Max: ", max(data$value), "</div><br/>",
        "<div style='color:white;'>Average: ", mean(data$value), "</div><br/>"
      ))
    })


    rolling_mean <- rollmean(data$value, 5)
    rolling_mean1 <- rollmean(my_data1$sensors$RelHumid, 5)

    # Combine data into a data frame
    df <- data.frame(y1 = rolling_mean, y2 = rolling_mean1)

    # Plot the data with ggplot
    ggplot(df, aes(x = 1:length(rolling_mean))) +
      geom_line(aes(y = y1, color = "Line 1")) +
      geom_line(aes(y = y2, color = "Line 2")) +
      labs(x = "X-axis", y = "Y-axis", color = "Lines") +
      ggtitle("Two Lines Plot") +
      theme_minimal()
    # ggplot(
    #   data = data.frame(Date = 1:length(rolling_mean), Value = rolling_mean, Value1=rolling_mean1),
    #   aes(x = Date, y = Value)
    # ) +
    #   geom_line(color = color, linewidth = 1.5) +
    #   labs(x = "Date", y = y_value_axis) +
    #   theme(
    #     plot.background = element_rect(fill = "#333333"),
    #     panel.background = element_rect(fill = "#333333"),
    #     panel.border = element_rect(color = "#444444", fill = NA, size = 2),
    #     panel.grid.major = element_line(color = "#444444"),
    #     panel.grid.minor = element_line(color = "#444444"),
    #     axis.text = element_text(color = "white"),
    #     axis.title = element_text(color = "white")
    #   )
  })
}

# Run the application
shinyApp(ui = ui, server = server)