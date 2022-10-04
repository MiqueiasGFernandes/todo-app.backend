import { container, InjectionToken } from 'tsyringe'

export default abstract class MainContainer {
  private static testDependenciesTokens: InjectionToken[] = []

  static resolve<T>(token: InjectionToken<T>): T {
    return container.resolve<T>(token)
  }
}
