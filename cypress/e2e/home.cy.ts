/// <reference types="cypress" />

import dayjs from "dayjs";

const supportedCoins = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
  },
  { id: "ethereum", symbol: "eth", name: "Ethereum" },
  { id: "tether", symbol: "usdt", name: "Tether" },
  {
    id: "defichain",
    symbol: "dfi",
    name: "DeFiChain",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
  },
];

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should find store name", () => {
    cy.get(".title").contains("La Coco Crypto Exchange");
  });

  it("Should find current date/time", () => {
    const currentDateTime = dayjs().format("DD/MM/YYYY dddd hh:mm A");
    cy.get(".date").contains(currentDateTime);
  });

  it("Should find supported coins on Base & Currency options", () => {
    cy.get("select[name='base'] option").then((option) => {
      const actual = [...option].map((o) => (o as HTMLSelectElement).value);
      expect(actual).to.deep.eq(supportedCoins.map((c) => c.id));
    });

    cy.get("select[name='currency'] option").then((option) => {
      const actual = [...option].map((o) => (o as HTMLSelectElement).value);
      expect(actual).to.deep.eq(supportedCoins.map((c) => c.id));
    });
  });

  it("Should not be able to select on same currency on both fields", () => {
    cy.get("select[name='base'] option")
      .not(":disabled")
      .each((option) => {
        const val = option.val();
        if (val) {
          cy.get("select[name='base']").select(val);
          cy.get("select[name='currency'] option:disabled").each((e) => {
            e.is(":disabled");
          });
        }
      });

    cy.get("select[name='currency'] option")
      .not(":disabled")
      .each((option) => {
        const val = option.val();
        if (val) {
          cy.get("select[name='currency']").select(val);
          cy.get("select[name='base'] option:disabled").each((e) => {
            e.is(":disabled");
          });
        }
      });
  });

  it("Should swap currency when swap button is clicked", () => {
    cy.get("select[name='base'] option:selected").then((o) => {
      const oldBase = o.val();
      cy.get("select[name='currency'] option:selected").then((o2) => {
        const oldCurrency = o2.val();
        cy.get("#swap-btn").click();
        cy.get("select[name='base'] option:selected").should(
          "have.value",
          oldCurrency
        );
        cy.get("select[name='currency'] option:selected").should(
          "have.value",
          oldBase
        );
      });
    });
  });
});
