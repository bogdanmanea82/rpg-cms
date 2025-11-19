# Docker Fundamentals - Complete Learning Reference

## Core Concepts

### Images and Containers
An image is a read-only template containing application code, runtime, libraries, and dependencies. A container is a running instance of an image with its own writable filesystem layer. Images are like classes in programming, containers are like objects instantiated from those classes. Multiple containers can run from the same image, each with its own state, just like multiple objects can be created from one class.

### Layers and Caching
Images are built from layers stacked on top of each other. Each Dockerfile instruction creates a new layer. Docker caches layers and reuses them when possible, dramatically speeding up builds. Layers are immutable and shared between images, so if ten images all need Node.js, they share those Node.js layers rather than storing ten copies.

The union filesystem presents these stacked layers as a single unified filesystem to the container. When a container writes to a file that exists in a lower layer, Docker copies that file to the writable layer first (copy-on-write), then modifies the copy. This preserves the read-only base layers.

### Volumes and Data Persistence
Containers are ephemeral by design - their writable filesystem layer disappears when you delete the container. Volumes provide persistent storage that survives container deletion. Named volumes are managed by Docker and exist independently in Docker's storage system. Bind mounts connect host directories directly into containers.

For applications with state (databases, uploaded files, logs), volumes are essential. The data lives in the volume, and containers mount the volume to access and modify that data. You can delete and recreate containers freely without losing data as long as they mount the same volume.

### Networks and Service Communication
Docker networks isolate container communication. The default bridge network connects containers on a single host. Custom bridge networks add DNS resolution where containers can find each other by service name instead of IP address.

When multiple services need to communicate (web server talking to database), putting them on the same custom network enables name-based discovery. The web server can connect to the database using its service name as hostname, and Docker's DNS resolves that name to the database container's IP address.

### Container Lifecycle
Containers have several states in their lifecycle. Created means Docker prepared the container but hasn't started it yet. Running means the main process is executing. Paused means Docker suspended all processes but kept their state in memory. Stopped means the main process exited, and the container exists but isn't running. Removing means Docker is deleting the container and its writable layer.

Understanding these states helps you diagnose problems. A container that keeps restarting is probably crashing, so check its logs. A container stuck in created state might have configuration errors preventing startup.

## Docker CLI Patterns

### Management Command Structure
Modern Docker CLI uses management commands that follow the pattern: docker <object-type> <action> <arguments>. The object type specifies what you're working with (container, image, network, volume), and the action specifies what operation to perform (list, inspect, create, remove).

This hierarchical structure makes commands self-documenting. If you forget a command, docker container --help shows all container operations. The pattern repeats across all object types, so once you learn it, you can predict commands you haven't used yet.

### Common Patterns
Almost every Docker object supports these common operations: list (show all objects), inspect (show detailed information about one object), create (make a new object), and remove (delete an object). Learning these four operations for each object type gives you comprehensive control over Docker.

The inspect command is particularly valuable for debugging because it shows the complete configuration Docker applied, not just what you specified. Sometimes the difference between what you think you configured and what Docker actually configured reveals the problem.

## Docker Compose Orchestration

### Declarative Configuration
Docker Compose uses declarative configuration where you describe the desired end state, and Compose figures out how to achieve it. Your docker-compose.yml file specifies services, networks, and volumes, and Compose creates everything to match that specification.

This approach contrasts with imperative commands where you manually create each component. Declarative configuration is self-documenting, reproducible, and version-controllable. You can commit your Compose file to Git, and anyone can recreate your entire application stack with one command.

### Service Dependencies
The depends_on directive tells Compose which services depend on others, and Compose starts services in the right order. However, depends_on only waits for containers to start, not for applications inside them to be ready. For robust startup coordination, use health checks that actually test if services are accepting connections.

### Environment Configuration
Compose loads environment variables from .env files automatically, making it easy to configure applications without hardcoding values. Variables in the Compose file (like ${WEB_PORT}) parameterize your configuration, while variables passed to containers configure applications running inside containers.

This two-level configuration system separates infrastructure configuration (which ports to expose, which images to use) from application configuration (database credentials, API keys). The infrastructure configuration goes in Compose files and Git, while application secrets go in environment files that stay local.

## Dockerfile Best Practices

### Layer Optimization
Order Dockerfile instructions to take advantage of caching. Instructions that rarely change (installing system packages) should come early. Instructions that change frequently (copying application code) should come late. This ordering maximizes cache reuse, keeping builds fast during development.

Using multi-stage builds (not covered yet but important for production) lets you compile code in one stage and copy only the runtime artifacts to the final stage, dramatically reducing final image size.

### Security Practices
Never run containers as root. Create a non-root user in your Dockerfile and switch to it before the CMD instruction. If an attacker compromises your application, they're limited to that user's permissions rather than having root access to the container.

Use official base images from trusted sources. These images receive security updates and follow best practices. The Alpine variant of most images provides a smaller attack surface because it includes fewer packages.

### Image Size Management
Smaller images download faster, use less disk space, and have smaller attack surfaces. Use Alpine base images when possible. Chain commands with && to combine multiple operations in one layer. Clean up package manager caches in the same layer where you install packages so temporary files don't persist in the image.

## Architecture Understanding

### Client-Daemon Model
The Docker CLI is a client that sends commands to the Docker daemon through a REST API. This separation enables remote Docker control and lets multiple clients (CLI, Docker Desktop GUI, CI systems) interact with the same daemon. The daemon does the actual work of managing containers, images, networks, and volumes.

### Container Isolation
Containers use Linux kernel features called namespaces and cgroups to provide isolation. Namespaces give each container its own view of system resources (process tree, network interfaces, filesystem mounts). Cgroups limit resource usage so one container can't monopolize the host's CPU, memory, or I/O.

This isolation is lighter weight than virtual machines because containers share the host kernel rather than each running a full operating system. This sharing enables much higher container density - you can run dozens or hundreds of containers on a server that could only support a handful of virtual machines.

### Storage Drivers
Docker uses storage drivers to manage image layers and container writable layers. The overlay2 driver is the default on modern systems and provides good performance with efficient disk usage. Understanding storage drivers matters when optimizing for performance or debugging storage-related issues.

## What I Learned Through Practice

During testing, I built a Node.js application from scratch and containerized it. The application demonstrated persistent data using volumes, where the counter survived container restarts. Adding a monitoring service showed how Docker networks enable service-to-service communication using service names.

Building the Dockerfile taught me how each instruction creates a layer and why instruction order matters for caching. Running the application with Docker Compose showed how orchestration simplifies multi-service applications. The health check configuration demonstrated how to verify services are actually ready rather than just started.

Examining resource usage with docker stats revealed how lightweight containers are compared to virtual machines. Watching the build cache work showed why optimizing Dockerfile layer order speeds up development. Testing data persistence by deleting and recreating containers proved that volumes truly exist independently of container lifecycle.

The most important insight is that containers are ephemeral and disposable by design. The system treats containers as cattle, not pets - you can delete and recreate them freely. This design enables deployment patterns like blue-green deployments and rolling updates where you replace containers with newer versions without downtime.

## Common Troubleshooting Patterns

When containers can't communicate, check networks first. Are they on the same network? Can they resolve each other's service names? Use docker network inspect to verify connections.

When containers restart repeatedly, check logs with docker logs. The container is probably crashing, and the logs show why. Common causes include missing environment variables, permission errors, or connection failures to dependencies.

When volumes don't persist data, verify mount paths match where the application writes data. Use docker volume inspect to see volume details. Exec into the container and check if the directory exists and has correct permissions.

When builds are slow, examine Dockerfile layer order. Are frequently changing instructions early in the file, invalidating cache for all subsequent layers? Reorder to put stable layers first and changing layers last.

## Next Steps and Advanced Topics

This foundation prepares you for advanced Docker topics you'll encounter as you build your RPG CMS. Multi-stage builds create smaller production images. Health checks enable robust service orchestration. Resource limits prevent containers from consuming excessive CPU or memory. Logging drivers send container logs to external systems for aggregation and analysis.

Docker Swarm and Kubernetes extend Docker's concepts to multi-host cluster orchestration. The patterns you learned here (services, networks, volumes, declarative configuration) translate directly to these orchestration systems, just at larger scale.
