# Vite Project with Docker

This is a Vite project, and this guide will walk you through the steps to build and run it locally using Docker.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for development)
- [Vite](https://vitejs.dev/) (though it's typically included as part of your project)

## Step 1: Build the Docker Image

1. **Navigate to the project directory**: Open your terminal and go to the root directory of your Vite project where the `Dockerfile` is located.

    ```bash
    cd /path/to/your/vite-project
    ```

2. **Build the Docker image**: Run the following command to build the Docker image:

    ```bash
    docker build -t vite-app .
    ```

    - `vite-app` is the name you are giving to the Docker image.
    - This command will use the `Dockerfile` in the current directory to build the image.

## Step 2: Run the Docker Container

Once the image is built, run the following command to start the container:

```bash

docker run -p 5173:5173 vite-app