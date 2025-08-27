import { useState } from "react";
import { executeTrade } from "../../services/tradeService.jsx";

export default function Trade() {
  const stocks = [
    { id: 1, symbol: "AAPL", name: "Apple", price: 182.34 },
    { id: 2, symbol: "MSFT", name: "Microsoft", price: 319.12 },
    { id: 3, symbol: "GOOGL", name: "Google", price: 135.89 }
  ];

  const userId = 1;

  const [selectedStock, setSelectedStock] = useState(stocks[0].symbol);
  const [type, setType] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);

  const stockObj = stocks.find(s => s.symbol === selectedStock);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors([]);

    const tradeData = {
      user_id: userId,
      stock_id: stockObj.id,
      type,
      quantity,
      price: stockObj.price
    };
    try {
      const response = await executeTrade(tradeData);
      setMessage(response.message);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || []);
      } else {
        setMessage("Erro na operação.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-900 to-indigo-700 pt-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Negociação de Ações</h1>

      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-lg shadow-md w-96">
        <div className="mb-4">
          <label className="block font-bold mb-1">Ação</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="border p-2 w-full"
          >
            {stocks.map(stock => (
              <option key={stock.id} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exibe o preço atual da ação */}
        <div className="mb-4">
          <label className="block font-bold mb-1">Preço Atual</label>
          <input
            type="text"
            value={`R$ ${stockObj.price*quantity}`}
            disabled
            className="border p-2 w-full bg-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="buy" required>Compra</option>
            <option value="sell" required>Venda</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1">Quantidade</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Executar
        </button>
      </form>

      {message && <p className="mt-4 text-green-400">{message}</p>}

      {errors.length > 0 && (
        <div className="mt-4 text-red-400">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}
    </div>
  );
}
