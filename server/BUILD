load("@rules_proto_grpc//cpp:defs.bzl", "cpp_grpc_library", "cpp_grpc_compile")
load("@rules_proto//proto:defs.bzl", "proto_library")
load("@rules_cc//cc:defs.bzl", "cc_binary")

proto_library(
    name = "mongodb",
    srcs = ["//:mongodb.proto"],
    deps = ["@com_google_protobuf//:any_proto"],
)

cpp_grpc_library(
    name = "mongodb_proto",
    deps = [":mongodb"],
)

cc_binary(
    name = "server",
    srcs = ["server.cc"],
    deps = [
        ":mongodb_proto",
        "@com_github_grpc_grpc//:grpc++",
    ]
)
