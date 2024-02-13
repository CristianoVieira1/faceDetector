// @ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron, { networking } from 'reactotron-react-native'

if (__DEV__ && !process.env.JEST_WORKER_ID) {
  // @ts-ignore
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure()
    // .configure({ host: '192.168.15.38' })
    .use(networking())
    .useReactNative()
    .connect()

  tron.clear()
}
