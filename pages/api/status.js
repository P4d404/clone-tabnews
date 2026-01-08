function status(request, response) {
  response.status(200).json({ chave: "valor 1" });
}

export default status;
