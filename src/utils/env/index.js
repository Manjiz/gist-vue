import uaTypes from '@/config/uaTypes'
import ua from '@/libs/ua'

import App from './app'
import Mobile from './mobile'
import Wechat from './wechat'
import QQ from './qq'

const configs = {
  [uaTypes.APP]: App,
  [uaTypes.WECHAT]: Wechat,
  [uaTypes.QQ]: QQ,
  [uaTypes.MOBILE]: Mobile
}

export default configs[ua]
