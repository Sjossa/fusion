import { franc } from "franc-min";

export default {
  meta: {
    type: "problem",
    docs: {
      description:
        "Interdit les noms de variables, fonctions et classes en français",
      category: "Best Practices",
    },
    messages: {
      frenchDetected:
        "Évite d'utiliser du français pour '{{ name }}', utilise l'anglais.",
    },
  },
  create(context) {
    function checkIdentifier(node) {
      const name = node.name.toLowerCase();

     
      if (franc(name) === "fra") {
        context.report({
          node,
          messageId: "frenchDetected",
          data: { name: node.name },
        });
      }
    }

    return {
      Identifier: checkIdentifier,
    };
  },
};
