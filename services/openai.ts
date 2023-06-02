import axios  from 'axios';
import defaults from '../config/default';

interface address {
    search_text: string,
};

class OpenaiHandler {

    geocodeAddress = async (data: address) => {
        const url = "https://api.openai.com/v1/geocode";
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${defaults.openai_api_key()}`,
        };

        return new Promise((resolve, reject) => {
            axios.post(url, data, {headers})
            .then((res) => {
                console.log("Response:", res)
                resolve(res.data);
            })
            .catch((err) => {
                console.log("Geocoding API request failed:", err)
                reject(err);
            });
        })
    }
}

const openai = new OpenaiHandler()
export default openai
// geocodeAddress("1600 Amphitheatre Parkway, Mountain View, CA")
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
