<?php

namespace Zeus\Commands;

use Zeus\Helpers;

class ZeusCommands
{
    /**
     * Run e2e Test Suite.
     *
     * ## EXAMPLES
     *
     *     zeus test
     *
     * @when after_wp_load
     */
    public function test()
    {
        Helpers\app(TestCommand::class)->handle();
    }

    /**
     * Generates a JSON SiteMap.
     *
     * ## EXAMPLES
     *
     *     zeus generate
     *
     * @when after_wp_load
     */
    public function generate()
    {
        Helpers\app(GenerateCommand::class)->handle();
    }
}
