import { describe, it, expect } from "vitest";
import DateUtils from "../src/utils/date_utils";

describe("DateUtils", () => {
  // Test de formatDateRange
  describe("formatDateRange", () => {
    it("devrait formater correctement une plage de dates", () => {
      const result = DateUtils.formatDateRange("2023-06-01", "2023-06-10");
      expect(result).toBe("Juin 2023 - Juin 2023");
    });

    it("devrait retourner la date seule si les dates de début et de fin sont identiques", () => {
      const result = DateUtils.formatDateRange("2023-06-01", "2023-06-01");
      expect(result).toBe("Juin 2023");
    });

    it("devrait lancer une erreur si la date de début est null", () => {
      expect(() => DateUtils.formatDateRange(null, "2023-06-10")).toThrow(
        "La date de début ou la date de fin est null",
      );
    });

    it("devrait retourner la date de début si la date de fin est null", () => {
      const result = DateUtils.formatDateRange("2023-06-01", null);
      expect(result).toBe("Juin 2023");
    });

    it("devrait lancer une erreur si la date de début est supérieure à la date de fin", () => {
      expect(() =>
        DateUtils.formatDateRange("2023-06-10", "2023-06-01"),
      ).toThrow("La date de début est supérieure à la date de fin");
    });

    it("devrait formater correctement une plage de dates dans une locale différente", () => {
      const result = DateUtils.formatDateRange(
        "2023-06-01",
        "2023-06-10",
        "en-US",
      );
      expect(result).toBe("Jun 2023 - Jun 2023");
    });
  });

  // Test de formatDate
  describe("formatDate", () => {
    it("devrait formater une date correctement", () => {
      const result = DateUtils.formatDate("2023-06-01");
      expect(result).toBe("Juin 2023");
    });

    it("devrait formater une date dans une locale différente", () => {
      const result = DateUtils.formatDate("2023-06-01", "en-US");
      expect(result).toBe("Jun 2023");
    });
  });

  describe("isPastDate", () => {
    it("devrait retourner true si la date est passée", () => {
      const result = DateUtils.isPastDate("2020-01-01");
      expect(result).toBe(true);
    });

    it("devrait retourner false si la date est dans le futur", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const result = DateUtils.isPastDate(
        futureDate.toISOString().split("T")[0],
      );
      expect(result).toBe(false);
    });

    it("devrait lancer une erreur si la date est vide", () => {
      expect(() => DateUtils.isPastDate("")).toThrow(
        "Format de date invalide. date: ",
      );
    });

    it("devrait lancer une erreur si la date est null", () => {
      expect(() => DateUtils.isPastDate(null)).toThrow(
        "Format de date invalide. date: null",
      );
    });

    it('devrait lancer une erreur si la date est "Invalid Date"', () => {
      expect(() => DateUtils.isPastDate("Invalid Date")).toThrow(
        "Format de date invalide. date: Invalid Date",
      );
    });
  });

  describe("isFutureDate", () => {
    it("devrait retourner true si la date est passée", () => {
      const result = DateUtils.isFutureDate(new Date(2999, 1, 1));
      expect(result).toBe(true);
    });
  });
});
