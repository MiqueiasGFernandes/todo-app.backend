import { container, InjectionToken } from 'tsyringe'
import { constructor } from 'tsyringe/dist/typings/types'

export default abstract class MainContainer {
  private static testDependenciesTokens: InjectionToken[] = []

  static createTestDependency<T>(token: InjectionToken<T>, provider: unknown): void {
    MainContainer.testDependenciesTokens.push(token)

    container.register<T>(token, provider as constructor<any>)
  }

  static resolve<T>(token: InjectionToken<T>): T {
    return container.resolve<T>(token)
  }
}
