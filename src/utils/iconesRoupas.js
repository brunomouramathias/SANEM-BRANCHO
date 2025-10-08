// Mapeamento de tipos de roupas para ícones
export const getIconeRoupa = (tipo) => {
  const tipoLower = tipo?.toLowerCase() || "";
  
  // Camisas e camisetas
  if (tipoLower.includes("camisa") || tipoLower.includes("camiseta") || tipoLower.includes("blusa")) {
    return "👕";
  }
  
  // Calças
  if (tipoLower.includes("calça") || tipoLower.includes("jeans") || tipoLower.includes("calca")) {
    return "👖";
  }
  
  // Vestidos
  if (tipoLower.includes("vestido")) {
    return "👗";
  }
  
  // Agasalhos e casacos
  if (tipoLower.includes("agasalho") || tipoLower.includes("jaqueta") || tipoLower.includes("casaco") || tipoLower.includes("moletom")) {
    return "🧥";
  }
  
  // Sapatos
  if (tipoLower.includes("sapato") || tipoLower.includes("tênis") || tipoLower.includes("tenis") || tipoLower.includes("bota")) {
    return "👞";
  }
  
  // Shorts e bermudas
  if (tipoLower.includes("short") || tipoLower.includes("bermuda")) {
    return "🩳";
  }
  
  // Saias
  if (tipoLower.includes("saia")) {
    return "👚";
  }
  
  // Meias
  if (tipoLower.includes("meia") || tipoLower.includes("meia-calça")) {
    return "🧦";
  }
  
  // Acessórios
  if (tipoLower.includes("chapéu") || tipoLower.includes("chapeu") || tipoLower.includes("boné") || tipoLower.includes("bone")) {
    return "🎩";
  }
  
  if (tipoLower.includes("bolsa") || tipoLower.includes("mochila")) {
    return "👜";
  }
  
  if (tipoLower.includes("óculos") || tipoLower.includes("oculos")) {
    return "👓";
  }
  
  if (tipoLower.includes("gravata")) {
    return "👔";
  }
  
  if (tipoLower.includes("luva")) {
    return "🧤";
  }
  
  if (tipoLower.includes("cachecol")) {
    return "🧣";
  }
  
  // Roupas íntimas e pijamas
  if (tipoLower.includes("pijama")) {
    return "🩱";
  }
  
  // Roupas de banho
  if (tipoLower.includes("biquíni") || tipoLower.includes("biquini") || tipoLower.includes("maiô") || tipoLower.includes("maio")) {
    return "🩱";
  }
  
  // Roupas de esporte
  if (tipoLower.includes("esporte") || tipoLower.includes("fitness")) {
    return "🎽";
  }
  
  // Default
  return "👔";
};

export const getCategoriaColor = (tipo) => {
  const tipoLower = tipo?.toLowerCase() || "";
  
  if (tipoLower.includes("camisa") || tipoLower.includes("camiseta")) return "#4CAF50";
  if (tipoLower.includes("calça") || tipoLower.includes("jeans")) return "#2196F3";
  if (tipoLower.includes("vestido")) return "#E91E63";
  if (tipoLower.includes("agasalho") || tipoLower.includes("casaco")) return "#FF9800";
  if (tipoLower.includes("sapato") || tipoLower.includes("tênis")) return "#795548";
  
  return "#9E9E9E";
};

