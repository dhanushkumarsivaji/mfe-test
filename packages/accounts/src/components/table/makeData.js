
import { faker } from '@faker-js/faker'
import moment from 'moment';


const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}


const newData = () => {
  return {
    accountId: faker.datatype.number(100),
    accountName: faker.name.fullName(),
    accountStatus: faker.helpers.shuffle([
      'Open',
      'PendingOpen',
      'Closed',
    ])[0],
    productType: faker.helpers.shuffle([
        'Equity',
        'Fixed Income',
        'Balanced',
      ])[0],
      // date: moment().format("MM-DD-YYYY")
      date: moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))
      .format('MM-DD-YYYY')
  }
}

export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d) => {
      return {
        ...newData(),
      }
    })
  }

  return makeDataLevel()
}
