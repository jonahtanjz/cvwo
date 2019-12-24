class Api::TodoResource < JSONAPI::Resource
    attributes :body, :status, :tag
end