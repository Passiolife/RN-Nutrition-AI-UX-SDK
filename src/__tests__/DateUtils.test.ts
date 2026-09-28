import { Settings } from 'luxon';
import {
  convertToNextMidnight,
  convertToPreviousMidnight,
} from '../utils/DateUtils';

// The day range used to query food logs, water and weight must follow the
// user's local calendar day, not the UTC day.
describe('DateUtils day boundaries', () => {
  const defaultZone = Settings.defaultZone;

  afterEach(() => {
    Settings.defaultZone = defaultZone;
  });

  it('uses the local day for an evening west of UTC', () => {
    Settings.defaultZone = 'America/Los_Angeles';
    // Sep 27, 18:30 in Los Angeles is already Sep 28 in UTC.
    const date = new Date('2026-09-28T01:30:00.000Z');

    expect(convertToPreviousMidnight(date).toISOString()).toBe(
      '2026-09-27T07:00:00.000Z'
    );
    expect(convertToNextMidnight(date).toISOString()).toBe(
      '2026-09-28T06:59:59.999Z'
    );
  });

  it('uses the local day for a morning east of UTC', () => {
    Settings.defaultZone = 'Asia/Ho_Chi_Minh';
    // Sep 28, 06:00 in Ho Chi Minh City is still Sep 27 in UTC.
    const date = new Date('2026-09-27T23:00:00.000Z');

    expect(convertToPreviousMidnight(date).toISOString()).toBe(
      '2026-09-27T17:00:00.000Z'
    );
    expect(convertToNextMidnight(date).toISOString()).toBe(
      '2026-09-28T16:59:59.999Z'
    );
  });

  it('handles a daylight saving transition day', () => {
    Settings.defaultZone = 'America/Los_Angeles';
    // Mar 8, 2026 is only 23 hours long in Los Angeles.
    const date = new Date('2026-03-08T20:00:00.000Z');

    expect(convertToPreviousMidnight(date).toISOString()).toBe(
      '2026-03-08T08:00:00.000Z'
    );
    expect(convertToNextMidnight(date).toISOString()).toBe(
      '2026-03-09T06:59:59.999Z'
    );
  });

  it('keeps the same range when the device is on UTC', () => {
    Settings.defaultZone = 'UTC';
    const date = new Date('2026-09-28T12:34:56.789Z');

    expect(convertToPreviousMidnight(date).toISOString()).toBe(
      '2026-09-28T00:00:00.000Z'
    );
    expect(convertToNextMidnight(date).toISOString()).toBe(
      '2026-09-28T23:59:59.999Z'
    );
  });

  it('includes the last millisecond of the day', () => {
    Settings.defaultZone = 'UTC';
    const lastLog = new Date('2026-09-28T23:59:59.500Z');

    expect(convertToNextMidnight(lastLog).getTime()).toBeGreaterThanOrEqual(
      lastLog.getTime()
    );
  });

  it('does not mutate the input date', () => {
    Settings.defaultZone = 'America/Los_Angeles';
    const date = new Date('2026-09-28T01:30:00.000Z');

    convertToPreviousMidnight(date);
    convertToNextMidnight(date);

    expect(date.toISOString()).toBe('2026-09-28T01:30:00.000Z');
  });
});
