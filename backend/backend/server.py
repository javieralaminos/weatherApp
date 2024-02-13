from fastapi import FastAPI

app = FastAPI()

temperatures = []

@app.post("/addTemperature")
def add_temperature(temperature: float):
    temperatures.append(temperature)
    return {"message": "Temperature added successfully"}

@app.get("/getTemperature")
def get_temperature():
    return {"temperatures": temperatures}

handler = app.handler
