import { useEffect, useState } from "react";
import Prayer from "./Componanet/Prayer"
function App() {
 
  const [PrayerTimes, setPrayer] = useState({})
  const [Prayerdate, setPrayerdate] = useState('')
  const [City, setCity] = useState('Cairo')
  const [Country, setCountry] = useState("Egypt");
const prayers = [
  { name: "الفجر", key: "Fajr" },
  { name: "الشروق", key: "Sunrise" },
  { name: "الظهر", key: "Dhuhr" },
  { name: "العصر", key: "Asr" },
  { name: "المغرب", key: "Maghrib" },
  { name: "العشاء", key: "Isha" },
];
  


const cities = [
  { name: "القاهرة", value: "Cairo", country: "Egypt" },
  { name: "الإسكندرية", value: "Alexandria", country: "Egypt" },
  { name: "الجيزة", value: "Giza", country: "Egypt" },
  { name: "المنصورة", value: "Mansoura", country: "Egypt" },

  { name: "الرياض", value: "Riyadh", country: "Saudi Arabia" },
  { name: "مكة المكرمة", value: "Mecca", country: "Saudi Arabia" },
  { name: "دبي", value: "Dubai", country: "United Arab Emirates" },
  { name: "الدوحة", value: "Doha", country: "Qatar" },
  { name: "إسطنبول", value: "Istanbul", country: "Turkey" },
  { name: "لندن", value: "London", country: "United Kingdom" },
  { name: "باريس", value: "Paris", country: "France" },
  { name: "نيويورك", value: "New York", country: "United States" },
];


let formatetime = (time) => {
  if (!time) {
    return "00:00";
  }

  let [hours, minutes] = time.split(":");

  hours = Number(hours);

  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes} ${period}`;
};


  
  useEffect(()=> {
    
    const fetchPrayerTimes = async () => {
      try {
      

const response = await fetch(
  `https://api.aladhan.com/v1/timingsByCity/24-10-2026?city=${City}&country=${Country}`
);
        const dataPrayer = await response.json()
        console.log(dataPrayer)
        setPrayer(dataPrayer.data.timings)//مواقيت الصلاه
        setPrayerdate(dataPrayer.data.date.gregorian.date)//الوقت
       
      }
      catch (error){
        console.log(error)
      }

    }
    fetchPrayerTimes()
  },[City])

  return (
    <section>
      <div className='container'>

        <div className="Top">
          
          <div className="city">
            <h4>المدينه</h4>

            <select
  value={City}
  onChange={(e) => {
    const selected = cities.find(
      (city) => city.value === e.target.value
    );

    setCity(selected.value);
    setCountry(selected.country);
  }}
>
              {cities.map((city) => {
                return <option key={city.value} value={city.value}>{ city.name}</option>
          })}
  
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h3>{Prayerdate}</h3>
          </div>

        </div>

        <div className="Lower"> 
    {prayers.map((prayer) => (
  <Prayer
    key={prayer.key}
    name={prayer.name}
    time={formatetime(PrayerTimes[prayer.key])}
  />
))}
        </div >

      </div>
    </section>
  )
}

export default App
