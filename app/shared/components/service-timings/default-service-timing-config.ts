// export const serviceTimingInfos = [
//     {
//       dayOfWeek: 'SUNDAY', 
//       state: false, 
//       prefix: 'su', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'MONDAY', 
//       state: false, 
//       prefix: 'mo', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'TUESDAY', 
//       state: false, 
//       prefix: 'tu', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'WEDNESDAY', 
//       state: false, 
//       prefix: 'we', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'THURSDAY', 
//       state: false, 
//       prefix: 'Th', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'FRIDAY', 
//       state: false, 
//       prefix: 'Fr', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//     {
//       dayOfWeek: 'SATURDAY', 
//       state: false, 
//       prefix: 'Sa', 
//       timingInfoList: [
//         {
//           startTime: '',
//           endTime: ''
//         }
//       ]
//     },
//   ]

/**
 * Enum for common colors.
 * @readonly
 * @enum {{dayOfWeek: string, prefix: string}}
 */
 const ServiceDays = Object.freeze({
    SUNDAY: { dayOfWeek: "SUNDAY", prefix: "Su" }, 
    MONDAY:{ dayOfWeek: "MONDAY", prefix: "Mo" },
    TUESDAY:  { dayOfWeek: "TUESDAY", prefix: "Tu" },
    WEDNESDAY: { dayOfWeek: "WEDNESDAY", prefix: "We" },
    THURSDAY: { dayOfWeek: "THURSDAY", prefix: "Th" },
    FRIDAY: { dayOfWeek: "FRIDAY", prefix: "Fr" },
    SATURDAY: { dayOfWeek: "SATURDAY", prefix: "Sa" },
  });
const days: any[] = [
    ServiceDays.SUNDAY, 
    ServiceDays.MONDAY, 
    ServiceDays.TUESDAY, 
    ServiceDays.WEDNESDAY,
    ServiceDays.THURSDAY,
    ServiceDays.FRIDAY,
    ServiceDays.SATURDAY
]
const availableDays = () => {
    return days.map(day => ({
        ...day, 
        state: false,
        timingInfoList: [{ startTime: '', endTime: '' }]
    }));
}

export default availableDays;