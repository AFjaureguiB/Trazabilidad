"use strict";
import { InfectiousTests, Tissue } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";
import { TissueStatus } from "../constants/TissueStatus.js";

async function updateInfectiousTest(testId, testData) {
  try {
    const { tissueId, ...infectiousTestData } = testData;

    const tissueFound = await Tissue.findByPk(tissueId, {
      include: [
        {
          model: InfectiousTests,
          as: "infectiousTests",
        },
      ],
    });

    if (!tissueFound) return [null, "El tejido no existe"];

    const [infectiousTestFound] = tissueFound.infectiousTests.filter(
      (test) => test.id == testId
    );

    if (!infectiousTestFound) return [null, "La prueba infecciosa no existe"];

    //Actualizamos la informacion de la prueba en cuestion.
    await infectiousTestFound.update(infectiousTestData);
    await infectiousTestFound.reload();
    await tissueFound.reload();

    /**
     * Un tejido puede tener los siguientes estados:
     * 1) `CUARENTENA`, el estado por defecto cuando se crea un Tissue y sus respectivas pruebas infecciosas, no hay nada que hacer con este estado, es el inicial.
     * 2) `EN PRUEBAS`, cuando al menos un registro de pruebas infecciosas tiene un valor en `result` distinto de `No Realizado`
     * 3) `RECHAZADO`, cuando al menos un registro de pruebas  infecciosas tiene un valor en `result` igual a `Reactivo`
     * 4) `ACEPTADO`, cuando todos los registros de pruebas infecciosas tienen un valor en `result` igual a `No Reactivo`
     */

    //2)`EN PRUEBAS`
    const inTesting = tissueFound.infectiousTests.some(
      (test) => test.result !== "No Realizado" && test.result !== "Reactivo" //tambien podriamos usar `test.result === "No Reactivo"`
    )
      ? TissueStatus.IN_TESTING
      : "";

    //3) `RECHAZADO`
    const rejected = tissueFound.infectiousTests.some(
      (test) => test.result === "Reactivo"
    )
      ? TissueStatus.REJECTED
      : "";

    //4) `ACEPTADO`
    const accepted = tissueFound.infectiousTests.every(
      (test) => test.result === "No Reactivo"
    )
      ? TissueStatus.ACCEPTED
      : "";

    console.log("inTesting---->", inTesting);
    console.log("rejected---->", rejected);
    console.log("accepted---->", accepted);

    //logica para actualizar el `status` del tejido
    if (inTesting) {
      await tissueFound.update({ status: TissueStatus.IN_TESTING });
    }

    if (rejected) {
      await tissueFound.update({ status: TissueStatus.REJECTED });
    }

    if (accepted) {
      await tissueFound.update({ status: TissueStatus.ACCEPTED });
    }

    return [infectiousTestFound.toJSON(), null];
  } catch (error) {
    handleError(error, "infectiuousTest.service -> updateInfectiousTest");
  }
}

export default {
  updateInfectiousTest,
};
