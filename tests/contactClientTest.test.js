import { describe, it, expect, vi } from "vitest";
import {
  sendMail_asClient,
  callNumber_asClient,
  sendSMS_asClient,
} from "../src/utils/contact_client";

describe("sendMail_asClient", () => {
  it("should warn if no address is provided", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    sendMail_asClient("");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Aucune adresse mail n'a été renseignée. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });

  it("should warn if address is invalid", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    sendMail_asClient("invalid-email");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "L'adresse mail renseignée est incorrecte. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });
});

describe("callNumber_asClient", () => {
  it("should warn if no number is provided", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    callNumber_asClient("");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Aucun numéro de téléphone n'a été renseigné. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });

  it("should warn if number is invalid", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    callNumber_asClient("invalid-number");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Le numéro de téléphone renseigné est incorrect. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });
});

describe("sendSMS_asClient", () => {
  it("should warn if no number is provided", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    sendSMS_asClient("");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Aucun numéro de téléphone n'a été renseigné. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });

  it("should warn if number is invalid", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn");
    sendSMS_asClient("invalid-number");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Le numéro de téléphone renseigné est incorrect. Veuillez contacter l'administrateur du site.",
    );
    consoleWarnSpy.mockRestore();
  });
});
