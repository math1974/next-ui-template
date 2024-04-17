class ProductUtils {
  static parseUnit(unity) {
    if (!unity) {
      return "";
    }

    const unitLabelKeyMap = {
      KG: "Kg",
      UN: "Unidade",
      PÇ: "Peças",
    };

    return unitLabelKeyMap[unity] || "";
  }
}

export default ProductUtils;
