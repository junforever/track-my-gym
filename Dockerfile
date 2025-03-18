# Last Node.js lts image
FROM node:lts

# Stablish working directory
WORKDIR /app

# Install global packages
RUN apt update && apt install -y bash && \
    npm install -g @anthropic-ai/claude-code

# Expose port
EXPOSE 3000

# Keep container running
CMD ["tail", "-f", "/dev/null"]
