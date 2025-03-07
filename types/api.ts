// API Response Types
export interface APIResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Data Source Types
export interface DataSource {
  id: string
  name: string
  type: "postgres" | "mysql" | "mongodb" | "oracle" | "sqlserver"
  config: {
    host: string
    port: string
    database: string
    username: string
    password?: string // Only included in requests, not responses
    ssl?: boolean
    options?: Record<string, any>
  }
  status: "active" | "warning" | "error"
  createdAt: string
  updatedAt: string
}

// API Endpoints Interface
export interface APIEndpoints {
  GET_DATA_SOURCES: "/api/data-sources"
  GET_DATA_SOURCE: (id: string) => `/api/data-sources/${id}`
  CREATE_DATA_SOURCE: "/api/data-sources"
  UPDATE_DATA_SOURCE: (id: string) => `/api/data-sources/${id}`
  DELETE_DATA_SOURCE: (id: string) => `/api/data-sources/${id}`
  TEST_CONNECTION: "/api/data-sources/test-connection"
}

// Request Types
export interface CreateDataSourceRequest {
  name: string
  type: DataSource["type"]
  config: Omit<DataSource["config"], "password"> & {
    password: string
  }
}

export interface UpdateDataSourceRequest {
  name?: string
  config?: Partial<CreateDataSourceRequest["config"]>
}

export interface TestConnectionRequest {
  type: DataSource["type"]
  config: CreateDataSourceRequest["config"]
}

// Response Types
export interface DataSourceResponse extends APIResponse<DataSource> {}
export interface DataSourcesResponse extends APIResponse<DataSource[]> {}
export interface TestConnectionResponse
  extends APIResponse<{
    success: boolean
    message: string
  }> {}

