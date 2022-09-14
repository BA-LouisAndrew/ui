<script setup lang="ts">
import { LogoDocker, LogoGithub, NewspaperOutline } from "@vicons/ionicons5"
</script>

<template>
  <n-space class="home" vertical>
    <div>
      <n-h1 class="mb-0">Bachelor Thesis - Louis Andrew</n-h1>
      <n-space>
        <n-h5 class="mt-0">HTW Berlin. 2022</n-h5>
        <n-a
          class="link ml-12"
          href="https://ba-louisandrew.github.io/thesis/template.pdf"
          target="_blank"
        >
          <n-icon size="24">
            <newspaper-outline />
          </n-icon>
          <span> View thesis PDF </span>
        </n-a>
      </n-space>
    </div>

    <n-alert type="info">
      The site might be a little bit slow in the beginning. Backend is hosted in
      Heroku and it has a cold start.
    </n-alert>

    <n-space>
      <n-h2 class="mb-0">Overview</n-h2>
      <n-p>
        This project is the user interface of my bachelor thesis. This project
        is intended to serve as a tool for multiple teams to integrate their own
        security checks to detect a fraudulent entity into a single gateway.
        Each team can build their own security check as a REST API, and create a
        <n-a
          class="italic"
          href="https://louisandrew-bachelorarbeit.netlify.app/#/rules"
          target="_blank"
        >
          validation rule,
        </n-a>
        which will be used by this system to validate a certain entity.
      </n-p>
      <n-p>
        A validation rule contains the URI of the external security check (made
        by the individual teams), information regarding the request options
        (such as HTTP method, payload, URL parameters, etc.) and how the
        response from the external endpoint should look like to pass the check.
        The validation rules are saved in a database and will be evaluated
        during a validation process by the system, which is a
        <n-text strong>stateful</n-text> backend service that handles every
        validation process (we call it the
        <n-text italic>validation engine</n-text>).
      </n-p>
      <n-p>
        The validation engine executes a validation process by first getting the
        available validation rules from the database, sorting them based on
        their priority order and evaluating it sequentially. Whenever there's a
        request to the validation engine for a new validation process, it will
        return an ID of the process. This asynchronousity is intended to avoid a
        slow response time of the validation engine. Then, a client can
        subscribe to the latest progress of a validation event in real-time
        (using the SSE or Server-Sent-Event technology).
      </n-p>
      <n-p>
        To try out how a validation process is executed, and see its real-time
        progress, please
        <n-a
          href="https://louisandrew-bachelorarbeit.netlify.app/#/validations/create"
          target="_blank"
        >
          create a new validation process.
        </n-a>
        The (available) validation rules are available
        <n-a
          href="https://louisandrew-bachelorarbeit.netlify.app/#/rules"
          target="_blank"
        >
          here.
        </n-a>
        You can hover over each form field label to view the description on each
        fields.
      </n-p>
    </n-space>
    <n-space vertical>
      <n-h2 class="mb-0 mt-12"> Components </n-h2>
      <n-collapse>
        <template #header-extra>
          <n-icon size="40">
            <logo-docker />
          </n-icon>
        </template>
        <n-collapse-item
          title="Run the whole system via Docker Compose:"
          name="1"
        >
          <n-ul class="running">
            <n-li>
              <n-code class="code">
                git clone https://github.com/BA-LouisAndrew/system
              </n-code>
            </n-li>
            <n-li>
              <n-code class="code"> cd system && ./clone-components.sh </n-code>
            </n-li>
            <n-li>
              <n-code class="code"> docker-compose up -d --build </n-code>
            </n-li>
          </n-ul>
        </n-collapse-item>
      </n-collapse>

      <n-h3 class="mb-0">UI (this site)</n-h3>
      <n-ul>
        <n-li> Dashboard to create validation rules and run validation </n-li>
        <n-li>
          <span class="mb-0">Technologies:</span>
          <n-ul>
            <n-li>Vue 3</n-li>
            <n-li>Vite</n-li>
            <n-li>TypeScript</n-li>
            <n-li>SASS</n-li>
            <n-li>Naive UI as component library</n-li>
          </n-ul>
        </n-li>
      </n-ul>

      <n-h3 class="mt-12 mb-0">Backend</n-h3>
      <n-ul>
        <n-li>Used to run validation processes</n-li>
        <n-li>Provide APIs for validation rule CRUD operations</n-li>
        <n-li>
          Provide APIs for creating, updating and deleting runtime secrets (e.g.
          API keys, used during validation process)
        </n-li>
        <n-li>
          <n-a href="https://louisandrew-bachelorarbeit.herokuapp.com/docs/">
            Swagger
          </n-a>
        </n-li>
        <n-li> Deployed in a Docker container </n-li>
        <n-li>
          <span class="mb-0">Technologies:</span>
          <n-ul>
            <n-li>TypeScript</n-li>
            <n-li>
              Express + Tsoa (for automatic type generation and validation)
            </n-li>
            <n-li>Vitest</n-li>
            <n-li>Prisma</n-li>
          </n-ul>
        </n-li>
      </n-ul>

      <n-h3 class="mt-12 mb-0">Other stuff</n-h3>
      <n-ul>
        <n-li>
          Used RabbitMQ as the message queue. Whenever a validation process is
          completed, its result will be published to an exchange and additional
          services to consume the message can be implemented
        </n-li>
        <n-li>
          Used Redis as the single source of truth for the backend state. If no
          Redis instance is available, an in-memory cache is used as a fallback
        </n-li>
        <n-li> Tested, deployed and released via GitHub actions </n-li>
        <n-li>
          Used
          <n-a href="https://docs.lob.com/" target="_blank">Lob API</n-a> for
          address validation
        </n-li>
      </n-ul>
    </n-space>

    <n-space vertical>
      <n-a
        class="link mt-24"
        href="https://github.com/BA-LouisAndrew"
        target="_blank"
      >
        <n-icon size="24">
          <logo-github />
        </n-icon>
        <span> Visit GitHub organization </span>
      </n-a>
      <n-a class="link" href="https://github.com/louisandrew" target="_blank">
        <n-icon size="24">
          <logo-github />
        </n-icon>
        <span> Author's GitHub site </span>
      </n-a>
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped>
.italic {
  font-style: italic;
}

.mb-0 {
  margin-bottom: 0;
}

.mt-0 {
  margin-top: 0;
}

.home {
  .link {
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      margin-left: 8px;
    }
  }

  .running {
    margin-left: 16px;

    li {
      margin: 12px 0;

      .code {
        padding: 8px 12px;
      }
    }
  }

  :deep(.n-collapse-item__content-inner) {
    padding-top: 0 !important;
  }
}

.mb-12 {
  margin-bottom: 12px;
}

.mt-12 {
  margin-top: 12px;
}

.ml-12 {
  margin-left: 12px;
}

.mt-24 {
  margin-top: 24px;
}
</style>
