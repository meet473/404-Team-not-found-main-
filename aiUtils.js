function predictArrivalTime(distanceKm, speedKmph) {
  if (!speedKmph || speedKmph <= 0) return null;
  return Math.round((distanceKm / speedKmph) * 60);
}

function checkMaintenance(lastServiceKm, currentKm) {
  const diff = currentKm - lastServiceKm;
  if (diff >= 5000) return "SERVICE_DUE";
  if (diff >= 4000) return "SERVICE_SOON";
  return "OK";
}

module.exports = { predictArrivalTime, checkMaintenance };
