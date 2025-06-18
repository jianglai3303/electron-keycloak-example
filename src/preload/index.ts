import { contextBridge, ipcRenderer } from 'electron'
interface ContextAPI {
  login: (url: string) => void
  getAppVersion: () => Promise<string>
}

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled!')
}

const keycloakAPI: ContextAPI = {
  login: (url: string) => ipcRenderer.invoke('keycloak:login', url),
  getAppVersion: () => ipcRenderer.invoke('app:version')
}

try {
  contextBridge.exposeInMainWorld('context', keycloakAPI)
  contextBridge.exposeInMainWorld('env', {
    VMInfo: process.env.VM_INFO
  })
} catch (error) {
  console.log(error)
}
