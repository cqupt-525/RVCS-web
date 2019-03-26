import { Authorized as RenderAuthorized } from 'ant-design-pro'
import { getAuthority } from './authority'

let Authorized = RenderAuthorized(getAuthority())

const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority())
}

export { reloadAuthorized }
export default Authorized
