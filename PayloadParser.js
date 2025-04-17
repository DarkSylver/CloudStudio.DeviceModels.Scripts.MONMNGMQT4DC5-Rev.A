function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Verificar que la dirección del dispositivo sea la correcta
    //if (jsonPayload.deviceAddress.toString() !== device.address.toString()) {
      //  env.log('Invalid device address');}
       // return;
    

       

    // Parsear MQTT WEBHOOK
    if (jsonPayload.sensorMessages) {
        var temperatureSensor1 = device.endpoints.byAddress(1);
        var temperatureSensor2 = device.endpoints.byAddress(2);
        var temperatureSensor3 = device.endpoints.byAddress(3);
        var temperatureSensor4 = device.endpoints.byAddress(4);

        const data = jsonPayload.sensorMessages;
        //env.log("Gateway Name  --->",jsonPayload.gatewayMessage.gatewayName);
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    var devID1 = "812339";  // Congelados 1
                    var devID2 = "812338";  // Congelados 2
                    var devID3 = "812042";  // Congelados 3
                    var devID4 = "812341";  // Regrigerados

                    var sensorID = item.sensorID.toString();
                    //env.log("Sensor Name --> ",item.sensorName);
                    //env.log("Sensor ID --> ",sensorID);
                    //env.log("FECHA --> ",item.messageDate);
                    //env.log("TEMP --> ",item.rawData);
                    
                    if (devID1 == sensorID){
                        let auxtemp = parseFloat(item.rawData);
                        temperatureSensor1.updateTemperatureSensorStatus(auxtemp,item.messageDate);

                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado ---> ",auxtemp,"  date-->  " item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID1);

                    if (devID2 == sensorID){
                        let auxtemp2 = parseFloat(item.rawData);
                        temperatureSensor2.updateTemperatureSensorStatus(auxtemp2,item.messageDate);

                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado ---> ",auxtemp2, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID2);


                    if (devID3 == sensorID){
                        let auxtemp3 = parseFloat(item.rawData);
                        temperatureSensor3.updateTemperatureSensorStatus(auxtemp3,item.messageDate);

                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado ---> ",auxtemp3, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID3);  
                     
                    if (devID4 == sensorID){
                        let auxtemp4 = parseFloat(item.rawData);
                        temperatureSensor4.updateTemperatureSensorStatus(auxtemp4,item.messageDate);

                        device.updateDeviceBattery({voltage : item.voltage});
                        device.updateDeviceRssi({strength:item.signalStrength});
                        env.log("Valor actualizado ---> ",auxtemp4, item.messageDate, " Sensor--> ",sensorID);                       
                    }
                    else 
                        env.log ("NO OK  ", devID4);       
                }
                           
    }
}