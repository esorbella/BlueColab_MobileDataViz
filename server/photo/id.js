'use strict';

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
const csv = require('csv-parser');

const image_1 = './data/media/1700984317567-photo.jpg';
const image_2 = './data/media/image_2.jpeg';

(async () => {
    let form = new FormData();

    form.append('organs', 'auto');
    form.append('images', fs.createReadStream(image_1));

    const project = 'all';

    try {
        const { status, data } = await axios.post(
            'https://my-api.plantnet.org/v2/identify/' + project + '?api-key=2b10RIKodP0IQc4eGgBJFaABO',
            form, {
            headers: form.getHeaders()
        }
        );

        console.log('status', status); // should be: 200
        console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below]

        const file_path = './USRIISv2_MasterList.csv';
                fs.createReadStream(file_path)
          .pipe(csv())
          .on('data', (row) => {
            // Assuming the name is in the 'name' column, adjust the key if it's in a different column
            const currentName = row.scientificName;
            for (let specie of data.results) {
                let scientificNameWithoutAuthor = specie.species.scientificNameWithoutAuthor;
                if (scientificNameWithoutAuthor == currentName) {
                    console.log("Ahhh")
                    // if (specie.invasive) {
                    specie.invasive = true;
                  
                } else if (specie.invasive == true) {
                    // edge case 
                } else {
                    specie.invasive = false;
                }
    
            }
          })
          .on('end', () => {
            console.log('Finished reading the CSV file.');
        console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below]

          })
          .on('error', (error) => {
            console.error(`An error occurred: ${error}`);
          });
        

        
    } catch (error) {
        console.error('error', error);
    }
})();
