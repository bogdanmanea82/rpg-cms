# Start from the official Node.js 20 base image
# This image contains Node.js, npm, and a minimal Linux environment
FROM node:20-alpine

# Alpine is a tiny Linux distribution (about 5MB)
# Using Alpine reduces image size dramatically compared to full distributions

# Set metadata labels for the image
LABEL maintainer="bogdan@example.com"
LABEL description="Docker test application for learning container concepts"

# Create a non-root user for running the application
# Running as root inside containers is a security risk
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
# All subsequent commands execute in this directory
WORKDIR /app

# Copy the application code
# The . refers to the build context (the directory containing the Dockerfile)
COPY server.js .

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appgroup /app

# Create the data directory and set permissions
# This directory will be mounted as a volume
RUN mkdir -p /data && chown -R appuser:appgroup /data

# Switch to the non-root user
# All subsequent commands and the container runtime use this user
USER appuser

# Document which port the application listens on
# This is metadata only; it doesn't actually expose the port
EXPOSE 3000

# Define the command to run when the container starts
# Using the array syntax is preferred over the shell form
CMD ["node", "server.js"]
