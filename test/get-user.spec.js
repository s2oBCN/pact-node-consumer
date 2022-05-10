"use strict"

const expect = require("chai").expect
const path = require("path")
const { Pact, Matchers  } = require("@pact-foundation/pact")
const { getUserA } = require("../index")

describe("The User API", () => {
  let url = "http://localhost"
  const port = 8992

  const { eachLike, like, uuid, iso8601DateTime, ipv4Address, boolean } = Matchers

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "UserServiceNodeClient",
    provider: "UserService",
    pactfileWriteMode: "merge",
  })

  const SAMPLE_BODY = 
    {
      name: "UserA",
      id: "fc763eba-0905-41c5-a27f-3934ab26786c",
      ip_address: "127.0.0.1",
      admin:  false
    }
  

  const EXPECTED_BODY = 
    {
      name: like("UserA"),
      id: uuid("fc763eba-0905-41c5-a27f-3934ab26786c"),
      ip_address: ipv4Address("127.0.0.1"),
      admin:  boolean(false)
    }
  

  // Setup the provider
  before(() => provider.setup())

  // Write Pact when all tests done
  after(() => provider.finalize())

  // verify with Pact, and reset expectations
  afterEach(() => provider.verify())

  describe("get /users/UserA", () => {
    before(done => {
      const interaction = {
        state: "UserA exists and is not an administrator",
        uponReceiving: "a request for UserA",
        withRequest: {
          method: "GET",
          path: "/users/UserA",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      getUserA(urlAndPort).then(response => {
        expect(response.data).to.eql(SAMPLE_BODY)
        done()
      }, done)
    })
  })
})
