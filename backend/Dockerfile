# Use a Maven image with JDK 21
FROM maven:3-eclipse-temurin-21 AS build

WORKDIR /app

# Copy project files
COPY . .

# Change to backend directory where the pom.xml is located
WORKDIR /app/backend

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JDK 21 image for the final container
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the correct port
EXPOSE 8080

# Set up environment variable for Render's PORT
ENV PORT=8080

# Run the application and bind it to PORT
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]



