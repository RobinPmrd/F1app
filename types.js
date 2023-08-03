/**
 * @typedef {Object} Driver
 * @property {number} id
 * @property {number} titles
 * @property {number} number
 * @property {string} driverRef
 * @property {string} forename
 * @property {string} surname
 * @property {string} code
 * @property {string} nationality
 * @property {string} dob
 * @property {string} url
 * @property {number} wins
 * @property {number} grandprix
 * @property {number} podiums
 * @property {number} poles
 * @property {number} highestRacePosition
 * @property {number} highestGridPosition
 */

/**
 * @typedef {Object} Constructor
 * @property {number} id
 * @property {string} constructorRef
 * @property {string} name
 * @property {string} nationality
 * @property {string} url
 */

/**
 * @typedef {Object} DriverStandingRow
 * @property {number} position
 * @property {number} points
 * @property {string} forename
 * @property {string} surname
 * @property {string} team
 * @property {string} nationality
 */

/**
 * @typedef {Object} ConstructorStandingRow
 * @property {number} position
 * @property {number} points
 * @property {string} name
 * @property {string} nationality
 */

/**
 * @typedef {Object} Result
 * @property {number} id
 * @property {number} raceId
 * @property {Driver} driver
 * @property {Constructor} constructor
 * @property {number} number
 * @property {number} grid
 * @property {number} position
 * @property {string} positionText
 * @property {number} positionOrder
 * @property {number} points
 * @property {number} laps
 * @property {string} time
 * @property {number} milliseconds
 * @property {number} fastestLap
 * @property {number} rank
 * @property {string} fastestLapTime
 * @property {string} fastestLapSpeed
 * @property {Status} status
 */

/**
 * @typedef {Object} Qualifying
 * @property {number} id
 * @property {number} raceId
 * @property {Driver} driver
 * @property {Constructor} constructor
 * @property {number} number
 * @property {number} position
 * @property {string} q1
 * @property {string} q2
 * @property {string} q3
 */

/**
 * @typedef {Object} Race
 * @property {number} id
 * @property {number} year
 * @property {number} round
 * @property {Circuit} circuit
 * @property {string} name
 * @property {Date} date
 * @property {string} url
 * @property {string} winner
 */

/**
 * @typedef {Object} Circuit
 * @property {number} id
 * @property {string} circuitRef
 * @property {string} name
 * @property {location} location
 * @property {string} country
 * @property {number} lat
 * @property {number} lng
 * @property {number} alt
 * @property {string} url
 * @property {number} races
 */

/**
 * @typedef {Object} Status
 * @property {number} id
 * @property {string} status
 */