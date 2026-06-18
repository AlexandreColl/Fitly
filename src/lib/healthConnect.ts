import { Health } from '@capgo/capacitor-health';

export async function isHealthConnectAvailable(): Promise<boolean> {
  try {
    const result = await Health.isAvailable();
    return result.available;
  } catch {
    return false;
  }
}

export async function checkPermissions(): Promise<boolean> {
  try {
    const status = await Health.checkAuthorization({
      read: ['exerciseTime', 'totalCalories'],
      write: ['exerciseTime', 'totalCalories'],
    });
    return status.writeAuthorized.length > 0;
  } catch {
    return false;
  }
}

export async function requestPermissions(): Promise<boolean> {
  try {
    const result = await Health.requestAuthorization({
      read: ['exerciseTime', 'totalCalories'],
      write: ['exerciseTime', 'totalCalories'],
    });
    return result.writeAuthorized.length > 0;
  } catch {
    return false;
  }
}

export async function syncWorkoutToHealthConnect(
  startTime: number,
  durationSeconds: number,
  totalVolumeKg: number,
): Promise<void> {
  try {
    const available = await isHealthConnectAvailable();
    if (!available) return;

    const authorized = await checkPermissions();
    if (!authorized) return;

    const startDate = new Date(startTime).toISOString();
    const endDate = new Date(startTime + durationSeconds * 1000).toISOString();
    const durationMinutes = Math.round(durationSeconds / 60);

    await Health.saveSample({
      dataType: 'exerciseTime',
      value: durationMinutes,
      unit: 'minute',
      startDate,
      endDate,
    });

    const estimatedCalories = Math.round(totalVolumeKg * 0.02 + durationMinutes * 1.2);
    await Health.saveSample({
      dataType: 'totalCalories',
      value: estimatedCalories,
      unit: 'kilocalorie',
      startDate,
      endDate,
    });
  } catch {
    // Silently fail – Health Connect not available or not authorized
  }
}
