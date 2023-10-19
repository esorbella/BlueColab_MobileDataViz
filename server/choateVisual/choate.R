library(shiny)
library(jsonlite)
library(zoo)


# Define UI
ui <- fluidPage(
  titlePanel("Dropdown"),
  plotOutput("distPlot"),
  selectInput("dataset", "Choose a dataset:", 
                  choices = c("Conductivity", "Dissolved Oxygen", "Salinity", "Temperature", "Turbidity", "pH")),
)

# Define server logic
server <- function(input, output) {
  mydata <- fromJSON("https://colabprod01.pace.edu/api/influx/sensordata/Alan/idk/range?stream=false&start_date=2023-09-01T00%3A00%3A00%2B00%3A00&stop_date=2023-09-30T00%3A00%3A00%2B00%3A00")

  output$distPlot <- renderPlot({
    data <- switch(input$dataset,
                   "Conductivity" = mydata$sensors$Cond,
                   "Dissolved Oxygen" = mydata$sensors$DOpct,
                   "Salinity" = mydata$sensors$Sal,
                   "Temperature" = mydata$sensors$Temp,
                   "Turbidity" = mydata$sensors$Turb,
                   "pH" = mydata$sensors$pH
                   )

    plot(rollmean(data,5), type="l",col="red")

    # x <- data[[1]]
    # bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # hist(x, breaks = bins, col = 'darkgray', border = 'white',
    #      main = paste("Histogram of", input$dataset))
  })
}

# Run the application
shinyApp(ui = ui, server = server)
