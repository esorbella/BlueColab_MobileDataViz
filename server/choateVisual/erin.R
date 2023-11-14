# Load required libraries
library(shiny)
library(jsonlite)

# Function to fetch data
fetchData <- function(dataset) {
  # Replace the URL with your actual API endpoint
  url <- paste("http://localhost:3000/Weather/Choate/10-2023")
  
  # Fetch data from the API
  my_data <- fromJSON(url)
  
  # Convert timestamp to Date format
  my_data$timestamp <- as.Date(my_data$timestamp, format = "%Y-%m-%d")
  
  # Create a data frame based on the selected dataset
  data <- data.frame(
    timestamp = my_data$timestamp,
    value = switch(
      dataset,
      "Rain" = my_data$Rain,
      "Air Temperature" = my_data$AirTemp,
      "Relative Humidity" = my_data$RelHumid,
      "Wind Speed" = my_data$WindSpeed,
      "Barometric Pressure" = my_data$BaroPressure,
      "Vapor Pressure" = my_data$VaporPressure
    )
  )
  
  return(data)
}

# Define UI
ui <- fluidPage(
  titlePanel("Weather Data Explorer"),
  
  sidebarLayout(
    sidebarPanel(
      selectInput("dataset", "Select Dataset", choices = c(
        "Rain", "Air Temperature", "Relative Humidity",
        "Wind Speed", "Barometric Pressure", "Vapor Pressure"
      ))
    ),
    
    mainPanel(
      plotOutput("plot")
    )
  )
)

# Define server logic
server <- function(input, output) {
  # Reactive expression to fetch data based on user input
  data <- reactive({
    fetchData(input$dataset)
  })
  
  # Calculate daily averages
  daily_avg <- reactive({
    aggregate(value ~ timestamp, data = data(), FUN = mean)
  })
  
  # Render the plot
  output$plot <- renderPlot({
    # Plot the daily averages
    plot(daily_avg()$timestamp, daily_avg()$value, type = "l", col = "blue", lwd = 2,
         main = paste("Daily Averages for", input$dataset),
         xlab = "Date", ylab = paste("Daily Avg ", input$dataset))
  })
}

# Run the application
shinyApp(ui = ui, server = server)