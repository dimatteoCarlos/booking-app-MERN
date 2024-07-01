async function x() {
  const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=Maracaibo&limit=5&appid=ee0b0f68544d0354c4384e926055a225' )
  
const json=await response.json();
console.log(json)

return json              
                  }

x()