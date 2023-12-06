const fetch = require("node-fetch");
const fs = require('fs');

// update these parameters to change days
let monthlyDataParam = [
    {
        year: "2022",
        month: "12",
        end: "31"
    },
    {
        year: "2023",
        month: "01",
        end: "31"
    },
    {
        year: "2023",
        month: "02",
        end: "28"
    },
    {
        year: "2023",
        month: "03",
        end: "31"
    },
    {
        year: "2023",
        month: "04",
        end: "30"
    },
    {
        year: "2023",
        month: "05",
        end: "31"
    },
    {
        year: "2023",
        month: "06",
        end: "30"
    },
    {
        year: "2023",
        month: "07",
        end: "31"
    },
    {
        year: "2023",
        month: "08",
        end: "31"
    },
    {
        year: "2023",
        month: "09",
        end: "30"
    },
    {
        year: "2023",
        month: "10",
        end: "31"
    }
]

let allMonthsAlan = [];
(async () => {
    // iterate through months and get data
    for (let monthParm of monthlyDataParam) {

        let startYear = monthParm.year;
        let startMonth = monthParm.month;
        let startDay = "01";
        let startHour = "00"; // hours are in UTC, so four/five hours ahead of us
        let startMinute = "00";
        let startSecond = "00";

        let endYear = monthParm.year;
        let endMonth = monthParm.month;
        let endDay = monthParm.end;
        let endHour = "23";
        let endMinute = "59";
        let endSecond = "59";
        let utcOffsetHour = "00";
        let utcOffsetMinute = "00";

        let source = "Alan";

        try {
            // call API
            const response = await fetch(`https://colabprod01.pace.edu/api/influx/sensordata/${source}/idk/range?stream=false&start_date=${startYear}-${startMonth}-${startDay}T${startHour}%3A${startMinute}%3A${startSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}&stop_date=${endYear}-${endMonth}-${endDay}T${endHour}%3A${endMinute}%3A${endSecond}%2B${utcOffsetHour}%3A${utcOffsetMinute}`);
            if (!response.ok) {
                const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
                error.response = response;
                throw error;
            }
            const monthlyData = await response.json();

            allMonthsAlan.push({"data" : monthlyData});
            console.log('Data retrieved from Alan (called in dataRetrieval.js)!');

            //writes it to file
            fs.writeFile(`data/raw${source}SourceData.json`, JSON.stringify(allMonthsAlan, null, " "), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File saved successfully (called in dataRetrieval.js)!');
                }
            });
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }

    }
})();
