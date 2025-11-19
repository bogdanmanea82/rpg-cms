# Docker Desktop Setup Documentation

## Installation Details
- **Docker Desktop Version**: (check with `docker --version`)
- **Installation Date**: 2025-11-19
- **WSL2 Backend**: Enabled
- **Integration**: Ubuntu-22.04

## WSL2 Configuration

Located at: `C:\Users\YOUR_USERNAME\.wslconfig`
```ini
[wsl2]
memory=8GB
processors=4
swap=2GB
pageReporting=false
nestedVirtualization=true
```

### Resource Allocation Rationale
- Memory limited to 8GB to prevent WSL2 from consuming all system RAM
- Processor count set to 4 cores (adjust based on your CPU)
- Swap space provides safety margin for memory-intensive operations
- Nested virtualization enabled for potential future Kubernetes testing

## Verification Checklist

After installation, verify these components:

- [ ] `docker --version` shows version 24.0 or higher
- [ ] `docker compose version` shows version 2.x
- [ ] `docker info` connects to daemon without errors
- [ ] `docker pull hello-world` successfully downloads image
- [ ] `docker context show` displays correct context

## WSL2 Distributions

Docker Desktop creates two distributions:
- `docker-desktop`: Runs the Docker daemon
- `docker-desktop-data`: Stores images, containers, and volumes

These are separate from your Ubuntu-22.04 development environment.

## Troubleshooting

### "Cannot connect to Docker daemon"
1. Verify Docker Desktop is running (check system tray icon)
2. Check WSL Integration in Docker Desktop Settings → Resources → WSL Integration
3. Ensure Ubuntu-22.04 toggle is enabled
4. Restart Docker Desktop

### High memory usage
1. Check running containers: `docker ps`
2. Check disk usage: `docker system df`
3. Clean up unused resources: `docker system prune`
4. Adjust .wslconfig memory limit if needed

### WSL2 won't start after config change
1. Verify .wslconfig syntax is correct
2. Ensure memory and processor values are reasonable for your system
3. Remove .wslconfig temporarily to test with defaults
4. Check Event Viewer in Windows for detailed errors
