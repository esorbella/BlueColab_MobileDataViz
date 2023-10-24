library(shiny)
library(jsonlite)
library(zoo)
library(ggplot2)
library(shinyWidgets) # requires install.packages(shinyWidgets)
library(dataRetrieval)



# Define UI
ui <- fluidPage(
    titlePanel(h1("Monthly Report",
        align = "center",
        style = "color: white;"
    )),
    plotOutput("distPlot"),
    setBackgroundColor("#333333"),
    selectInput("location", "Choose a Location:",
        choices = c("Yonkers (01376307)", "West Point (01374019)", "Poughkeepsie (01372043)", "Choate Pond")
    ),
    selectInput("year", "Choose a Year:",
        choices = c("2023", "2021", "2022")
    ),
    selectInput("month", "Choose a Month:",
        choices = c(
            "January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October",
            "November", "December"
        )
    ),
    selectInput("dataset", "Choose a dataset:",
        choices = c(
            "Conductivity", "Dissolved Oxygen",
            "Salinity", "Temperature", "Turbidity", "pH"
        )
    )
)

# Define server logic
server <- function(input, output) {
    output$distPlot <- renderPlot({
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

        if (location == "Choate") {
            my_data <- fromJSON(paste("https://colabprod01.pace.edu/api/influx/",
                "sensordata/Alan/idk/range?stream=false",
                "&start_date=", start_year, "-", start_month,
                "-", start_day, "T00%3A00%3A00%2B00%3A00",
                "&stop_date=", end_year, "-", end_month,
                "-", end_day, "T23%3A59%3A59%2B00%3A00",
                sep = ""
            )) # R doesn't have string concatenation

            data <- switch(input$dataset,
                "Conductivity" = my_data$sensors$Cond,
                "Dissolved Oxygen" = my_data$sensors$DOpct,
                "Salinity" = my_data$sensors$Sal,
                "Temperature" = my_data$sensors$Temp,
                "Turbidity" = my_data$sensors$Turb,
                "pH" = my_data$sensors$pH
            )
        } else {
            my_data <- readNWISuv(siteNumbers = location, parameterCd = "all", startDate = paste(start_year, "-", start_month, "-", start_day, sep = ""), endDate = paste(end_year, "-", end_month, "-", end_day, sep = ""))
        }

        if (location == "01376307") {
            data <- switch(input$dataset,
                "Conductivity" = my_data$X_00095_00000,
                "Dissolved Oxygen" = my_data$X_00300_00000,
                "Salinity" = my_data$X_90860_00000,
                "Temperature" = my_data$X_00010_00000,
                "Turbidity" = my_data$X_63680_00000,
                "pH" = my_data$X_00400_00000
            )
        } else if (location == "01374019") {
            data <- switch(input$dataset,
                "Conductivity" = my_data$X_.HRECOS._00095_00000,
                "Dissolved Oxygen" = my_data$X_.HRECOS._00300_00000,
                "Salinity" = my_data$X_.HRECOS._90860_00000,
                "Temperature" = my_data$X_.HRECOS._00010_00000,
                "Turbidity" = my_data$X_.HRECOS._63680_00000,
                "pH" = my_data$X_.HRECOS._00400_00000
            )
        } else if (location == "01372043") {
            data <- switch(input$dataset,
                "Conductivity" = my_data$X_Surface_00095_00000,
                "Dissolved Oxygen" = my_data$X_Surface_00300_00000,
                "Salinity" = my_data$X_Surface_90860_00000,
                "Temperature" = my_data$X_Surface_00010_00000,
                "Turbidity" = my_data$X_Surface_63680_00000,
                "pH" = my_data$X_Surface_00400_00000
            )
        }

        color <- switch(input$dataset,
            "Conductivity" = "red",
            "Dissolved Oxygen" = "blue",
            "Salinity" = "orange",
            "Temperature" = "green",
            "Turbidity" = "purple",
            "pH" = "brown"
        )

        rolling_mean <- rollmean(data, 5)

        ggplot(
            data = data.frame(Date = 1:length(rolling_mean), Value = rolling_mean),
            aes(x = Date, y = Value)
        ) +
            geom_line(color = color, linewidth = 1.5) +
            labs(x = "Date", y = "Value") +
            theme(
                plot.background = element_rect(fill = "#333333"),
                panel.background = element_rect(fill = "#333333"),
                panel.border = element_rect(color = "#444444", fill = NA, size = 2),
                panel.grid.major = element_line(color = "#444444"),
                panel.grid.minor = element_line(color = "#444444"),
                axis.text = element_text(color = "white"),
                axis.title = element_text(color = "white")
            )
    })
}

# Run the application
shinyApp(ui = ui, server = server)