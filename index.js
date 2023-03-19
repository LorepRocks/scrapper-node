const { chromium } = require("playwright");

const options = [
  {
    date: "Salida 22 de Marzo - Regreso 28 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&inbound=2023-03-28T17%3A00%3A00.000Z&outbound=2023-03-22T17%3A00%3A00.000Z&destination=CUZ&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "Salida 22 de Marzo - Regreso 29 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&outbound=2023-03-22T17%3A00%3A00.000Z&destination=CUZ&inbound=2023-03-29T17%3A00%3A00.000Z&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "Salida 23 de Marzo - Regreso 30 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&outbound=2023-03-23T17%3A00%3A00.000Z&destination=CUZ&inbound=2023-03-30T17%3A00%3A00.000Z&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "salida 23 de Marzo - Regreso 28 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos?origin=BOG&inbound=2023-03-28T17%3A00%3A00.000Z&outbound=2023-03-23T17%3A00%3A00.000Z&destination=CUZ&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "Salida 24 de Marzo - Regreso 30 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&outbound=2023-03-24T17%3A00%3A00.000Z&destination=CUZ&inbound=2023-03-30T17%3A00%3A00.000Z&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "Salida 25 de Marzo - Regreso 31 de Marzo",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&outbound=2023-03-25T17%3A00%3A00.000Z&destination=CUZ&inbound=2023-03-31T17%3A00%3A00.000Z&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
  {
    date: "Salida 26 de Marzo - Regreso 1 de Abril",
    url: "https://www.latamairlines.com/co/es/ofertas-vuelos/?origin=BOG&outbound=2023-03-26T17%3A00%3A00.000Z&destination=CUZ&inbound=2023-04-01T17%3A00%3A00.000Z&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=PRICE%2Casc",
  },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  //page.setDefaultTimeout(600000);
  let minPrice = "2.000.000";
  let bestOption = "";

  for (const option of options) {
    await page.goto(option.url);
    const price = await (
      await page.waitForSelector(
        "span.display-currencystyle__CurrencyAmount-sc__sc-19mlo29-2:not(.currency)"
      )
    ).textContent();

    if (parseFloat(price) < parseFloat(minPrice)) {
      bestOption = option;
      minPrice = price;
    }

    const duration = await page.textContent(
      "span.card-flightstyle__TextTotalTimeFlight-sc__sc-16r5pdw-20"
    );
    const description = await page.textContent(
      ".card-flightstyle__CardExpander-sc__sc-16r5pdw-2 span"
    );

    console.log("===================================================");
    console.log(`${option.date}: \n`);
    console.log(`Precio: ${price} \n`);
    console.log(`Duración: ${duration} \n`);
    console.log(`Descripción: ${description} \n`);
    console.log("===================================================");
  }

  console.log("Best Option", { bestOption, price: parseFloat(minPrice) * 2 });

  browser.close();
})();
