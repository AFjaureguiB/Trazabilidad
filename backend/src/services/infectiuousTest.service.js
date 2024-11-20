import { getLogs } from "../services/logInfo.service.js";
import { logUserActivity } from "../services/logger.service.js"; // Importa la función para loguear actividad
import { InfectiousTests, Tissue } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";
import { TissueStatus } from "../constants/TissueStatus.js";
import compareAndLogChanges from "../utils/compareChanges.js";

async function updateInfectiousTest(testId, testData, user) {
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

    // Guardamos los datos previos para comparación
    const previousData = infectiousTestFound.toJSON();

    // Actualizamos la información de la prueba en cuestión
    await infectiousTestFound.update(infectiousTestData);
    await infectiousTestFound.reload();
    await tissueFound.reload();

    // Lógica de estado de tejido
    const inTesting = tissueFound.infectiousTests.some(
      (test) => test.result !== "No Realizado" && test.result !== "Reactivo"
    )
      ? TissueStatus.IN_TESTING
      : "";

    const rejected = tissueFound.infectiousTests.some(
      (test) => test.result === "Reactivo"
    )
      ? TissueStatus.REJECTED
      : "";

    const accepted = tissueFound.infectiousTests.every(
      (test) => test.result === "No Reactivo"
    )
      ? TissueStatus.ACCEPTED
      : "";

    // Lógica para actualizar el `status` del tejido
    if (inTesting) {
      await tissueFound.update({ status: TissueStatus.IN_TESTING });
    }

    if (rejected) {
      await tissueFound.update({ status: TissueStatus.REJECTED });
    }

    if (accepted) {
      await tissueFound.update({ status: TissueStatus.ACCEPTED });
    }

    // Comparar y loguear cambios
    const updatedData = infectiousTestFound.toJSON();
    const changes = {
      ...compareAndLogChanges(previousData, updatedData),
      testName: updatedData.testName,
    };

    // Loguear la actividad del usuario
    logUserActivity(
      user.username, // Suponiendo que `user` tiene una propiedad `username`
      user.role, // El rol del usuario
      "Infectious Tests", // Proceso
      `PUT /api/infectiousTests/${testId}`, // Acción
      changes // Datos actualizados
    );

    return [infectiousTestFound.toJSON(), null, updatedData];
  } catch (error) {
    handleError(error, "infectiousTest.service -> updateInfectiousTest");
    return [null, error.message];
  }
}

export default {
  updateInfectiousTest,
};
