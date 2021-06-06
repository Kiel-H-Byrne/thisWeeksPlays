import yahooFinance from "yahoo-finance";

export default async function quoteHandler(req, res) {
  const {
    query: { tickerSym },
    method,
  } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      const quote = yahooFinance.quote(
        {
          symbol: tickerSym,
          modules: ["price"],
        },
        function (err, quote) {
          console.log(quote);
          return quote;
          if (err) {
            console.error(err);
          }
        }
      );
      res.status(200).json(quote);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
