import { isServer } from "@tanstack/react-query"
import { useSyncExternalStore } from "react"

/**
 * Implement write lock variable
 */
export class MuLock<T> {
  private value: T | null = null
  private pm: Promise<T | null> = Promise.resolve(null)

  private ssr = false
  public isReady = true
  private listeners = new Set<(value: T | null) => void>() // 👈 thêm listener

  /**
   * Init with single value
   * @param val
   */
  constructor(
    val?: T,
    options?: {
      ssr?: boolean
      defaultLocked?: boolean
    },
  ) {
    this.ssr = Boolean(options?.ssr)
    this.value = val || null
    this.isReady = !options?.defaultLocked
    // if (options?.defaultLocked) {
    //   this.pm = new Promise<T | null>((resolve) => {
    //     this.subscribe((value) => {
    //       resolve(value)
    //     })
    //     setTimeout(() => {
    //       resolve(null)
    //     }, 30000)
    //   })
    // }
  }

  /**
   * Get the value immediately if isReady, otherwise throw an error
   * @returns
   */
  get(): T | null {
    if (!this.isReady) {
      throw new Error("AsyncVar is not ready yet")
    }
    return this.value
  }

  /**
   * Wait until ready and get the value
   * @returns
   */
  async tryGet() {
    if (!this.isReady) {
      return await this.pm
    }
    return this.value
  }

  /**
   * Get the value immediately if isReady, otherwise return defaultValue
   * @param defaultValue
   * @returns
   */
  getOrDefault(defaultValue: T | null): T | null {
    if (!this.isReady) {
      return defaultValue
    }
    return this.value
  }

  /**
   * Set immediately if isReady and reject if not ready
   * @param val
   * @returns
   */
  async set(val: Promise<T> | T | null): Promise<T | null> {
    if (!this.ssr && isServer) {
      return null
    }
    if (!this.isReady) {
      return Promise.reject(new Error("AsyncVar is not ready yet"))
    }

    this.isReady = false
    this.pm = Promise.resolve(val)
      .then((data) => {
        this.value = data
        this.notify() // 👈 notify sau khi set thành công

        return data
      })
      .catch((err) => {
        this.value = null
        return Promise.reject(err)
      })
      .finally(() => {
        this.isReady = true
      })

    return this.pm
  }

  /**
   * Wait until ready and set the value
   * @param val
   * @returns
   */
  async trySet(val: Promise<T> | T | null): Promise<T | null> {
    if (!this.isReady) {
      await Promise.resolve(this.pm)
    }

    return this.set(val)
  }

  async forceSet(val: T | null): Promise<T | null> {
    this.value = val
    this.notify()
    this.isReady = true
    return this.value
  }

  async waitGet(options?: { timeout?: number }): Promise<T | null> {
    if (this.isReady) {
      return this.value
    }
    return new Promise((resolve, reject) => {
      this.subscribe((value) => {
        resolve(value)
        if (options?.timeout) {
          setTimeout(() => {
            reject(new Error("Timeout"))
          }, options.timeout)
        }
      })
    })
  }

  // 👇 thêm 2 hàm dưới để tương thích useSyncExternalStore
  subscribe(callback: (value: T | null) => void): () => void {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  private notify() {
    for (const cb of this.listeners) {
      cb(this.value)
    }
  }

  // 👇 snapshot luôn trả về giá trị nếu đã sẵn sàng, nếu không thì null
  getSnapshot = (): T | null => {
    return this.isReady ? this.value : null
  }

  public useStore() {
    return useSyncExternalStore(
      this.subscribe.bind(this), // Đăng ký lắng nghe
      this.getSnapshot, // Lấy snapshot mới nhất
      this.ssr ? this.getSnapshot : undefined,
    )
  }
}
