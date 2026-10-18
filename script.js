document.addEventListener('DOMContentLoaded', () => {
  const inputValor = document.getElementById('calc-valor');
  const inputDistancia = document.getElementById('calc-distancia');
  const inputConsumo = document.getElementById('calc-consumo');
  const inputCombustivel = document.getElementById('calc-combustivel');
  const inputManutencao = document.getElementById('calc-manutencao');

  const resCombustivel = document.getElementById('res-combustivel');
  const resManutencao = document.getElementById('res-manutencao');
  const resLucro = document.getElementById('res-lucro');
  const resLkm = document.getElementById('res-lkm');
  const metaStatus = document.getElementById('meta-status');

  function calcularLucro() {
    const valor = parseFloat(inputValor.value) || 0;
    const distancia = parseFloat(inputDistancia.value) || 0;
    const consumo = parseFloat(inputConsumo.value) || 1;
    const precoCombustivel = parseFloat(inputCombustivel.value) || 0;
    const manutencaoKm = parseFloat(inputManutencao.value) || 0;

    // Fórmulas do Motor Financeiro (especificação)
    const custoCombustivel = (distancia * precoCombustivel) / consumo;
    const custoManutencaoTotal = distancia * manutencaoKm;
    const custosTotais = custoCombustivel + custoManutencaoTotal;
    
    const lucroEstimado = valor - custosTotais;
    const liquidoPorKm = distancia > 0 ? lucroEstimado / distancia : 0;

    // Atualizar UI
    resCombustivel.textContent = `R$ ${custoCombustivel.toFixed(2)}`;
    resManutencao.textContent = `R$ ${custoManutencaoTotal.toFixed(2)}`;
    resLucro.textContent = `R$ ${lucroEstimado.toFixed(2)}`;
    resLkm.textContent = `R$ ${liquidoPorKm.toFixed(2)} / km`;

    // Meta mínima configurável (ex: R$ 2,00 / km)
    if (liquidoPorKm >= 2.00) {
      metaStatus.className = 'meta-badge positive';
      metaStatus.innerHTML = `✅ Acima da meta mínima (R$ 2,00/km) — Ótima corrida!`;
    } else if (liquidoPorKm >= 1.20) {
      metaStatus.className = 'meta-badge warning';
      metaStatus.innerHTML = `⚠️ Rentabilidade intermediária (Abaixo da meta ideal)`;
    } else {
      metaStatus.className = 'meta-badge';
      metaStatus.style.background = 'rgba(239, 68, 68, 0.15)';
      metaStatus.style.color = 'var(--danger)';
      metaStatus.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      metaStatus.innerHTML = `❌ Abaixo do custo viável — Corrida rejeitada`;
    }
  }

  const inputs = [inputValor, inputDistancia, inputConsumo, inputCombustivel, inputManutencao];
  inputs.forEach(input => {
    input.addEventListener('input', calcularLucro);
  });

  // Executar ao carregar
  calcularLucro();
});
