'use strict';

const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams

const image_1 = './data/media/image_1.jpeg';
const image_2 = './data/media/image_2.jpeg';

(async () => {
    let form = new FormData();

    form.append('organs', 'auto');
    form.append('images', fs.createReadStream(image_1));

  //  form.append('organs', 'leaf');
  //  form.append('images', fs.createReadStream(image_2));

    const project = 'all'; // try specific floras: 'weurope', 'canada'…

    try {
        const { status, data } = await axios.post(
            'https://my-api.plantnet.org/v2/identify/' + project + '?api-key=2b10RIKodP0IQc4eGgBJFaABO',
            form, {
            headers: form.getHeaders()
        }
        );

        console.log('status', status); // should be: 200
        console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below
    } catch (error) {
        console.error('error', error);
    }
})();
