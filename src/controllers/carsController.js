import carsService from "../services/carsService.js";

export async function postCreateCar(req, res) {
  const { userId } = res.locals;
  const { photos } = req.body;

  await carsService.postCreateCar(userId, req.body, photos);
  res.status(201).send("Car created successfully");
}

export async function postUpdateCar(req, res) {
  const { carId } = req.params;
  const { userId } = res.locals;
  const { photos } = req.body;
  const carData = {
    userId: userId,
    ...req.body,
  };
  delete carData.photos;

  const idCar = await carsService.postUpdateCar(carId, userId, photos, carData);

  res.status(200).send(`Car ${idCar} updated successfully`);
}

export async function getCarList(req, res) {
  const result = await carsService.getCarList();
  res.status(200).send(result);
}

export async function getCarById(req, res) {
  const { id } = req.params;
  const result = carsService.getCarById(id)
  res.status(200).send(result);
}

export async function getCarBySearch(req, res) {
  const term = req.query.term;
  const result = await carsService.getCarBySearch(term);
  res.status(200).send(result);
}

export async function getCarRanking(req, res) {
  const result = await carsService.getCarRanking();
  res.status(200).send(result);
}

export async function confirmSale(req, res) {
  const { id } = req.params;
  const { sell } = req.body;
  
  const result = carsService.confirmSale(id, sell);
  return res.status(200).send(result);
}

export async function deleteSale(req, res) {
  const { id } = req.params;
  await carsService.deleteSale(id);
  return res.status(200).send("Deletado com sucesso!");
}